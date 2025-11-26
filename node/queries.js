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

export default q;
