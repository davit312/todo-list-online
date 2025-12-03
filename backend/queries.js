const q = new Map();

q["CREATE_USERS_TABLE"] = `CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    creation_date INTEGER DEFAULT (strftime('%s', 'now'))
)`;

q["INSERT_USER"] = `
    INSERT INTO users (fullname, email, password)
    VALUES (?, ?, ?)
`;
q["GET_USER"] = "SELECT * FROM users WHERE email = ? AND password = ?";
q["GET_USER_BY_ID"] = "SELECT * FROM users WHERE id = ?";
/***************** */

q["CREATE_TODO_TABLE"] = `CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    userid INTEGER,
    task TEXT NOT NULL,
    complete INTEGER DEFAULT 0,
    creation_date INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (userid) REFERENCES users(id)
)`;

q["GET_TODO"] = `SELECT * FROM todos WHERE id = ?`;
q["GET_USER_TODOS"] = `SELECT * FROM todos 
    WHERE userid = ? ORDER BY creation_date DESC`;
q["INSERT_TODO"] = `INSERT INTO todos (userid, task) VALUES (?, ?)`;

q["UPDATE_TODO"] = `UPDATE todos SET task = ?, complete = ? 
    WHERE id = ? and userid = ?`;

q["DELETE_TODO"] = `DELETE FROM todos WHERE id = ? and userid = ?`;

export default q;
