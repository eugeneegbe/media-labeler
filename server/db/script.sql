CREATE TABLE user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text NOT NULL UNIQUE
);

CREATE TABLE contribution(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text NOT NULL,
    filename text NOT NULL,
    track text NOT NULL,
    response text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL 
);