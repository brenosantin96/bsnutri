create database teste;
use TESTE;

CREATE TABLE Foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(191),
    portion INT,
    protein FLOAT,
    calories FLOAT,
    grease FLOAT,
    salt FLOAT,
    image VARCHAR(191)
);

CREATE TABLE Meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(191),
    isMeal TINYINT,
    portion INT,
    protein FLOAT,
    calories FLOAT,
    grease FLOAT,
    salt FLOAT,
    image VARCHAR(191)
);

CREATE TABLE Meals_Foods (
    meal_id INT, -- Identificador do meal, deve ser um inteiro
    food_id INT, -- Identificador do food, deve ser um inteiro
    PRIMARY KEY (meal_id, food_id), -- Define uma chave primária composta pelas colunas meal_id e food_id
    FOREIGN KEY (meal_id) REFERENCES Meals(id) ON DELETE CASCADE ON UPDATE CASCADE, -- Define meal_id como chave estrangeira referenciando a coluna id na tabela Meals, com comportamento de deleção em cascata
    FOREIGN KEY (food_id) REFERENCES Foods(id) ON DELETE CASCADE ON UPDATE CASCADE-- Define food_id como chave estrangeira referenciando a coluna id na tabela Foods, com comportamento de deleção em cascata
);

/* 
Exemplo de consulta para associar um meal a um food:
INSERT INTO Meals_Foods (meal_id, food_id) VALUES (1, 2);

Exemplo de consulta para obter todos os foods de um meal específico:
SELECT f.*
FROM Foods f
JOIN Meals_Foods mf ON f.id = mf.food_id
WHERE mf.meal_id = 1;

Exemplo de consulta para obter todos os meals que contêm um food específico:
SELECT m.*
FROM Meals m
JOIN Meals_Foods mf ON m.id = mf.meal_id
WHERE mf.food_id = 1;
*/


SELECT *
FROM foods AS f
INNER JOIN users_has_foods AS uhf ON f.id = uhf.foods_id
INNER JOIN users AS u ON uhf.users_id = u.id
WHERE u.name = 'Breno';


SELECT f.*, u.name AS user_name, u.email AS user_email
FROM foods AS f
INNER JOIN users_has_foods AS uhf ON f.id = uhf.foods_id
INNER JOIN users AS u ON uhf.users_id = u.id;