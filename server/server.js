import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";
// import db from "./db/db-connection.js";

const app = express();
// const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
// app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;

// Configuring cors middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// related to build, creates an endpoint for the route /api
// app.get('/', (req, res) => {
//res.json({ message: 'Hello from My template ExpressJS' });
//   res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
// });

// Requests User Authorization
const client_id = process.env.CLIENTID;
const client_secret = process.env.CLIENTSECRET;
const redirect_uri = "http://localhost:8080/login";

app.get("/login", (req, res) => {});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
