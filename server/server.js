import express, { urlencoded } from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
// import db from "./db/db-connection.js";

const app = express();
const PORT = process.env.PORT || 8080;
// BUILD
// const REACT_BUILD_DIR = path.join(_dirname, "..", "client", "build");
// app.use(express.static(REACT_BUILD_DIR);

// Configuring cors middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hello D");
});

// get build
// app.get("/", (req, res) => {
//   res.sendFile(path.join(REACT_BUILD_DIR, 'index.html));
// }

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
