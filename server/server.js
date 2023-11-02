import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import db from "./db/db-connections.js";
import "dotenv/config";
import querystring from "querystring";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");

//Initialize instance of express and assign port
const app = express();
const PORT = process.env.PORT || 8080;
//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(REACT_BUILD_DIR));

//Serve static webpage
app.get("/", (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

//Define variables that store sensitive information
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
//Generate a random string containing numbers and letters for security reasons to use in Login handler
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//Request User Auth from Spotify and specific scope access
const stateKey = "spotify_auth_state";
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
  //Receive the auth code and include it in queryParams
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//Exchange the auth code for an Access Token
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
    //Destructure the response.data to pass auth token from BE to our FE in URL queryParams
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;
        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
        });
        res.redirect(`http://localhost:5173/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

//Refresh Spotify token, since it expires after 3600 seconds
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

//GET req from 'EmoMap' table in my 'emohelper_db' psql database for valence score based on the provided 'emotion' query parameter
app.get("/getValence", async (req, res) => {
  const selectedEmotion = req.query.emotion;

  try {
    // query to retrieve the valence score
    const query = "SELECT valence FROM EmoMap WHERE emotion = $1";
    const { rows } = await db.query(query, [selectedEmotion]);

    // If there's a result, rows[0] should contain the valence score
    if (rows.length > 0) {
      const valence = rows[0].valence;
      res.json({ valence }); //send valence as a json response to the client side
    } else {
      res
        .status(404)
        .json({ error: "Valence score not found for the selected emotion" });
    }
  } catch (error) {
    console.error("Error fetching valence from the database:", error);
    res.status(500).json({ error: error });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
