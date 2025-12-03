import { existsSync } from "fs";
import sqlite3 from "sqlite3";

import queries from "./queries.js";

const DB_FILE = "../sqlite/app.db";
const TEST_USER_TODOS = [];

if (existsSync(DB_FILE)) {
  console.error(`Database file '${DB_FILE}' already exists.`);
  process.exit(1);
}

const handleDBResult = function (err, errorMsg, successMsg) {
  if (err) {
    console.error(`${errorMsg}: ${err.message}`);
  } else {
    console.log(successMsg);
  }
};
let db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log(`Successfully connected to the SQLite database: ${DB_FILE}`);

    db.serialize(() => {
      db.run(queries["CREATE_USERS_TABLE"], (err) =>
        handleDBResult(
          err,
          "Error creating table users",
          'Table "users" created.'
        )
      );

      db.run(queries["CREATE_TODO_TABLE"], (err) =>
        handleDBResult(
          err,
          "Error creating table todos",
          'Table "todos" created.'
        )
      );

      // Create test user
      const testUserValues = [
        "test",
        "test@mail.com",
        Math.random().toString(36).substring(2, 8),
      ];
      db.run(queries["INSERT_USER"], testUserValues, (err) => {
        handleDBResult(
          err,
          "Error while creating test user",
          "Test user created successfully"
        );
        console.info("Test useer params :::::::::::::::::::::");
        console.log(
          `Email: ${testUserValues[1]}, Password: ${testUserValues[2]}`
        );
      });
    });

    db.close((err) => {
      handleDBResult(
        err,
        "Error closing database",
        "Database connection closed."
      );
    });
  }
});
