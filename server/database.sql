CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    favorite_genre INTEGER NOT NULL
);

INSERT INTO users (name, email, password, favorite_genre) VALUES ('Brandon', 'brandon@gmail.com', 'password', 38);