import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";
// import db from "./db/db-connection.js";
import querystring from "querystring";
import axios from "axios";

const app = express();
// const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
// app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
// Configuring cors middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//for BUILD, creates an endpoint for the route /api
// app.get('/api', (req, res) => {
//res.json({ message: 'Hello from My template ExpressJS' });
//   res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
// });

// Requests User Auth from Spotify
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope = "user-read-private user-read-email";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//exchange the authorization code for an access token by sending a POST request to the /api/token endpoint.
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
    .then((response) => {
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
