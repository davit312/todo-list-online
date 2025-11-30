const q = new Map();

q['CREATE_USERS_TABLE'] = `CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    creation_date INTEGER DEFAULT (strftime('%s', 'now'))
);`;

q['INSERT_USER'] = `
    INSERT INTO users (fullname, email, password)
    VALUES (?, ?, ?)
`;
/***************** */

q['CREATE_TODO_TABLE'] = `CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    userid INTEGER,
    task TEXT NOT NULL,
    complete INTEGER DEFAULT 0,
    creation_date INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (userid) REFERENCES users(id)
);`;

q['INSERT_TODO'] = ``;
q['UPDATE_TODO'] = ``;
q['DELETE_TODO'] = `DELETE FROM todos WHERE id = ?`;

export default q;
