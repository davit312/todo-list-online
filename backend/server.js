import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Required to convert import.meta.url to a file path

import sqlite3 from "sqlite3";
import queries from "./queries.js";

const tokens = new Map();

const DB_FILE = "../sqlite/app.db";
const PUBLIC_FOLDER = "../frontend/dist";

let db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

import cors from "cors";
app.use(cors());

app.use(express.json());

// 2. Built-in middleware to parse incoming requests with urlencoded payloads (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// 3. --- STATIC FILE SERVING ---
// All requests that do not match an an API route will look in the 'public' directory first.
app.use(express.static(path.join(__dirname, PUBLIC_FOLDER)));

// --- API Router Setup ---
const apiRouter = express.Router();
app.use(express.json());

apiRouter.post("/login", async (req, res) => {
  if (req.body?.token) {
    const id = tokens.get(req.body.token);
    db.get(queries["GET_USER_BY_ID"], [id], (err, row) => {
      if (err) {
        return res.status(500).send({ error: true, message: err.message });
      }

      if (!row?.id) {
        console.log("user not found for id", id, "and token", req.body.token);
        return res.status(401).send({ error: true, message: "User not found" });
      }

      return res.status(200).send({ error: false, user: row });
    });
  } else {
    const email = req.body?.email || "";
    const password = req.body?.password || "";

    db.get(queries["GET_USER"], [email, password], (err, row) => {
      if (err) {
        return res.status(500).send({ error: true, message: err.message });
      }

      if (!row?.id) {
        console.log("user not found", email, password);
        return res.status(401).send({ error: true, message: "User not found" });
      }
      row.token = password.slice(0, 3) + Date.now() + email.split("@").at(0);
      tokens.set(row.token, row.id);
      return res.status(200).send({ error: false, user: row });
    });
  }
});

apiRouter.post("/register", (req, res) => {
  console.log(req.body);
  const { fullname, email, password, autoLogin } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).send({
      error: true,
      message: "Missing required fields: username, email, or password.",
    });
  }

  // 1. Check if a user with this email already exists
  db.get(queries["GET_USER"], [email], (err, row) => {
    if (err) {
      return res.status(500).send({ error: true, message: err.message });
    }

    if (row) {
      // User with this email already exists
      return res.status(409).send({
        error: true,
        message: "A user with this email already exists.",
      });
    }

    // 2. Insert the new user into the database
    db.run(
      queries["INSERT_USER"],
      [fullname, email, password],
      function (insertErr) {
        if (insertErr) {
          // Handle database insertion error
          console.error("User registration error:", insertErr.message);
          return res
            .status(500)
            .send({ error: true, message: insertErr.message });
        }

        // The 'this.lastID' property holds the row ID of the last row inserted
        const newUserId = this.lastID;

        // 3. Generate a token for immediate login
        // Reusing your simple token generation logic from /login
        const token =
          password.slice(0, 3) + Date.now() + email.split("@").at(0);
        tokens.set(token, newUserId);

        // 4. Respond with success message, user details, and the token
        if (autoLogin) {
          return res.status(201).send({
            error: false,
            message: "User registered successfully",
            user: { id: newUserId, fullname, email },
            token: token,
          });
        } else {
          return res.status(201).send({
            error: false,
            message: "User registered successfully",
            user: {},
          });
        }
      }
    );
  });
});

apiRouter.post("/logout", (req, res) => {
  if (!req.body?.token) {
    return res.status(400).send({ error: true, message: "No token provided" });
  }

  if (req.headers?.["x-auth"] !== req.body.token) {
    return res.status(401).send({ error: true, message: "Not authorized" });
  }
  if (tokens.has(req.body.token)) {
    tokens.delete(req.body.token);
  }
  console.log("Logout success");
  return res.status(200).send({ error: false });
});

// ToDo endpoints

app.use("/api", apiRouter);

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, PUBLIC_FOLDER, "index.html"));
});

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Static files served from: ${PUBLIC_FOLDER}`);
  console.log("API endpoints are available under: /api");
  console.log("Running with ES Module Syntax!");
});
