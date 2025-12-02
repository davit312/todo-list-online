import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to convert import.meta.url to a file path

import sqlite3 from 'sqlite3';
import queries from './queries.js';

const tokens = new Map();

const DB_FILE = '../sqlite/app.db';

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

import cors from 'cors';
app.use(cors());

app.use(express.json());

// 2. Built-in middleware to parse incoming requests with urlencoded payloads (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// 3. --- STATIC FILE SERVING ---
// All requests that do not match an an API route will look in the 'public' directory first.
app.use(express.static(path.join(__dirname, 'public')));

// --- API Router Setup ---
const apiRouter = express.Router();
app.use(express.json());

apiRouter.post('/login', async (req, res) => {
  if (req.body?.token) {
    const id = tokens.get(req.body.token);
    db.get(queries['GET_USER_BY_ID'], [id], (err, row) => {
      if (err) {
        return res.status(500).send({ error: true, message: err.message });
      }

      if (!row?.id) {
        console.log('user not found for id', id, 'and token', req.body.token);
        return res.status(401).send({ error: true, message: 'User not found' });
      }

      return res.status(200).send({ error: false, user: row });
    });
  } else {
    const email = req.body?.email || '';
    const password = req.body?.password || '';

    db.get(queries['GET_USER'], [email, password], (err, row) => {
      if (err) {
        return res.status(500).send({ error: true, message: err.message });
      }

      if (!row?.id) {
        console.log('user not found', email, password);
        return res.status(401).send({ error: true, message: 'User not found' });
      }
      row.token = password.slice(0, 3) + Date.now() + email.split('@').at(0);
      tokens.set(row.token, row.id);
      return res.status(200).send({ error: false, user: row });
    });
  }
});

apiRouter.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: true, message: 'Missing required fields: username, email, or password.' });
  }

  // 1. Check if a user with this email already exists
  db.get(queries['GET_USER_BY_ID'], [email], (err, row) => {
    if (err) {
      return res.status(500).send({ error: true, message: err.message });
    }

    if (row) {
      // User with this email already exists
      return res.status(409).send({ error: true, message: 'A user with this email already exists.' });
    }

    // 2. Insert the new user into the database
    db.run(queries['INSERT_USER'], [username, email, password], function (insertErr) {
      if (insertErr) {
        // Handle database insertion error
        console.error('User registration error:', insertErr.message);
        return res.status(500).send({ error: true, message: insertErr.message });
      }

      // The 'this.lastID' property holds the row ID of the last row inserted
      const newUserId = this.lastID;

      // 3. Generate a token for immediate login
      // Reusing your simple token generation logic from /login
      const token = password.slice(0, 3) + Date.now() + email.split('@').at(0);
      tokens.set(token, newUserId);

      // 4. Respond with success message, user details, and the token
      return res.status(201).send({
        error: false,
        message: 'User registered successfully',
        user: { id: newUserId, username, email, token: token },
      });
    });
  });
});

apiRouter.post('/logout', (req, res) => {
  if(!req.body?.token){
    return res.status(400).send({error: true, message: 'No token provided'})
  }

  if(req.headers?.['x-auth'] !== req.body.token){
    return res.status(401).send({error: true, message: 'Not authorized'})
  }
  if(tokens.has(req.body.token)) {
    tokens.delete(req.body.token)
  }
  console.log('Logout success')
  return res.status(200).send({error: false})

});

app.use('/api', apiRouter);
//--------------------------------------------
//-----------------------------------------
//-------------------------------------------

// We create a separate router for all API endpoints to keep them organized.

/**
 * @route GET /api/status
 * @description A test route to check API health.
 */
apiRouter.get('/status', (req, res) => {
  res.status(200).json({
    message: 'API is running successfully!',
    service: 'Express API',
    api_version: '1.0',
  });
});

/**
 * @route POST /api/data
 * @description Original example route, now under the API router.
 */
apiRouter.post('/data', (req, res) => {
  // Check if the request body contains data
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body cannot be empty.' });
  }

  console.log('Received data:', req.body);

  // Respond with the data received and a 201 Created status
  res.status(201).json({
    message: 'Data received successfully!',
    data: req.body,
    processed_at: new Date().toISOString(),
  });
});

// --- ROUTE MOUNTING ---
// All routes defined in apiRouter (e.g., '/status', '/data') will be prefixed with '/api'

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Static files served from: /public');
  console.log('API endpoints are available under: /api');
  console.log('Running with ES Module Syntax!');
});
