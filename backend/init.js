import queries from './queries.js';

import sqlite3 from 'sqlite3';

const DB_FILE = '../sqlite/app.db';
let db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log(`Successfully connected to the SQLite database: ${DB_FILE}`);

    db.serialize(() => {
      db.run(queries['CREATE_USERS_TABLE'], (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table "users" created or already exists.');
        }
      });

      // Create test user
      const testUserValues = [
        'test',
        'test@mail.com',
        Math.random().toString(36).substring(2, 8),
      ];
      db.run(queries['INSERT_USER'], testUserValues, (err) => {
        if (err) {
          console.error('Error while creating test user:', err);
        } else {
          console.log('Test user created successfully');
        }
        console.info('Query params', testUserValues);
      });
    });

    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
});
