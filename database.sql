CREATE TABLE users (
    username VARCHAR(50) NOT NULL,
    name VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255),
    PRIMARY KEY(username)
)


CREATE TABLE task (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255),
    descripcion TEXT,
    completada BOOLEAN,
    username VARCHAR(50),
    PRIMARY KEY(id),
    CONSTRAINT fk_task_users FOREIGN KEY (username) REFERENCES users(username)
)
