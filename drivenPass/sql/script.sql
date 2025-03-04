CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credentials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT unique_user_title 
        UNIQUE (user_id, title)
);


INSERT INTO users (name, email, password, created_at) VALUES (
    'Demo',
    'demo@driven.com.br',
    '$2b$10$AbCdEfGhIjKlMnOpQrStUv.ZPcHHM8xXyZ1234567890', 
    CURRENT_TIMESTAMP
);


INSERT INTO credentials (
    title, 
    url, 
    username, 
    password, 
    user_id, 
    created_at
) VALUES (
    'Exemplo Credencial',
    'https://exemplo.com',
    'usuario_exemplo',
    'criptografada_com_cryptr_secret',
    1,  
    CURRENT_TIMESTAMP
);