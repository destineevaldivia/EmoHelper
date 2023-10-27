import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
//import db from "./db/db-connection.js";
import querystring from "querystring";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");

//initialize instance of express and assign port
const app = express();
const PORT = process.env.PORT || 8080;
//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(REACT_BUILD_DIR));

//Creates an endpoint for the route /api
app.get("/", (req, res) => {
  //res.json({ message: 'Hello from My template ExpressJS' });
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});
//Requests User Auth from Spotify
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

//Generates a random string containing numbers and letters for security reasons to use in Login handler
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const stateKey = "spotify_auth_state";

//Requests authorization from Spotify for specific scope access
//Spotify authorizes and gives me an Auth Code
app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope =
    "user-read-email playlist-read-private user-library-read user-top-read";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//Exchanges the auth code for an Access Token
app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    //Use access token to request data from Spotify API
    .then((response) => {
      if (response.status === 200) {
        const { access_token, token_type } = response.data;
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `${token_type} ${access_token}`,
            },
          })
          .then((response) => {
            res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

//Refreshes Spotify token, since it expires after 3600 seconds
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
