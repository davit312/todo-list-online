import sqlite3 from 'sqlite3';

const userId = 1;
db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
  if (err) {
    console.error('Error running query:', err.message);
    return;
  }
  
  // 'row' is a single object: {id: 1, name: 'Alice', age: 30}
  if (row) {
    console.log('Selected Row:', row);
  } else {
    console.log(`No user found with id ${userId}`);
  }
});
