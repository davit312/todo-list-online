import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Required to convert import.meta.url to a file path

// --- ES MODULES DIRECTORY SETUP ---
// __dirname is not available in ES Modules. We construct it here.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use port 3000 by default, or an environment variable if set
const PORT = process.env.PORT || 3000;

// Middleware setup
// ----------------------------------------------------
// 1. Built-in middleware to parse incoming requests with JSON payloads (e.g., for POST/PUT requests)
app.use(express.json());

// 2. Built-in middleware to parse incoming requests with urlencoded payloads (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// 3. --- STATIC FILE SERVING ---
// All requests that do not match an an API route will look in the 'public' directory first.
app.use(express.static(path.join(__dirname, "public")));

// --- API Router Setup ---
// We create a separate router for all API endpoints to keep them organized.
const apiRouter = express.Router();

/**
 * @route GET /api/status
 * @description A test route to check API health.
 */
apiRouter.get("/status", (req, res) => {
  res.status(200).json({
    message: "API is running successfully!",
    service: "Express API",
    api_version: "1.0",
  });
});

/**
 * @route POST /api/data
 * @description Original example route, now under the API router.
 */
apiRouter.post("/data", (req, res) => {
  // Check if the request body contains data
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty." });
  }

  console.log("Received data:", req.body);

  // Respond with the data received and a 201 Created status
  res.status(201).json({
    message: "Data received successfully!",
    data: req.body,
    processed_at: new Date().toISOString(),
  });
});

// --- ROUTE MOUNTING ---
// All routes defined in apiRouter (e.g., '/status', '/data') will be prefixed with '/api'
app.use("/api", apiRouter);

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Static files served from: /public");
  console.log("API endpoints are available under: /api");
  console.log("Running with ES Module Syntax!");
});
