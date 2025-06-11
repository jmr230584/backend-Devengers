CREATE TABLE Filme (
 id_filme SERIAL PRIMARY KEY,
 titulo VARCHAR(35) NOT NULL,
 sinopse TEXT NOT NULL,
 duracao VARCHAR (4) NOT NULL,
 classificacao_etaria VARCHAR (2) NOT NULL,
 genero VARCHAR (20) NOT NULL,
 ano_lancamento INT NOT NULL,
 poster_filme TEXT NOT NULL
);

CREATE TABLE Sala(
id_sala SERIAL PRIMARY KEY,
numero_sala INT NOT NULL,
tipo_sala VARCHAR (15) NOT NULL,
numero_assento INT NOT NULL,
fileira INT NOT NULL
);

CREATE TABLE Sessao(
id_sessao SERIAL PRIMARY KEY,
id_filme INT REFERENCES Filme(id_filme),
id_sala INT REFERENCES Sala(id_sala),
data_hora_inicio DATE NOT NULL,
data_hora_fim DATE
);

CREATE TABLE Cliente(
id_cliente SERIAL PRIMARY KEY,
nome_completo  VARCHAR (80) NOT NULL,
email VARCHAR (80) UNIQUE NOT NULL,
senha VARCHAR (80) NOT NULL,
cpf VARCHAR(11) UNIQUE,
celular  VARCHAR (20) UNIQUE
);

CREATE TABLE Ingresso (
id_ingresso SERIAL PRIMARY KEY,
id_sessao INT REFERENCES Sessao(id_sessao),
id_cliente INT REFERENCES Cliente(id_cliente),
status_ingresso VARCHAR (15) NOT NULL,
preco_ingresso DECIMAL (10,2)
);

-- Inserindo dados na tabela Filme
INSERT INTO Filme (titulo, sinopse, duracao, classificacao_etaria, genero, ano_lancamento, poster_filme) VALUES
('O Conde de Monte Cristo', 'Em 1815, o marinheiro Edmond Dantès desafia ordens superiores para resgatar uma mulher naufragada do Mar Mediterrâneo. [...] Após ser jogado no mar, escapa e nada para a liberdade.', '180', '14', 'Drama Histórico', 2024, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-288404%2Ffotos%2F&psig=AOvVaw0uoaK8SEz9XOehEpEQgwDy&ust=1745511475342000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjnxb3H7owDFQAAAAAdAAAAABAE'),
('MaXXXine', 'Após escapar de um massacre, Maxine parte para Los Angeles em 1985 em busca de sucesso como atriz. [...] Um assassino em série conhecido como Night Stalker começa a fazer vítimas próximas à protagonista.', '104', '18', 'Terror', 2024, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.magazineluiza.com.br%2Fposter-cartaz-maxxxine-a-pop-arte-poster%2Fp%2Ffcfkk3476j%2Fde%2Fpser%2F&psig=AOvVaw0BqEq3rXRXJubTcB584vlS&ust=1745511818154000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJD0qrjI7owDFQAAAAAdAAAAABAE'),
('The Wild Robot', 'A robô ROZZUM 7134 naufraga em uma ilha desabitada e aprende a viver em harmonia com os animais locais, enquanto cuida de um filhote de ganso.', '100', 'L', 'Animação', 2024, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FThe_Wild_Robot&psig=AOvVaw0ViyHInDNqP3l9AnvHnOjD&ust=1745511863973000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCCk87I7owDFQAAAAAdAAAAABAI'),
('Desapega!', 'Rita, uma ex-compradora compulsiva, lidera um grupo de apoio enquanto lida com mudanças em sua vida pessoal, inclusive a ida da filha para o exterior.', '90', '12', 'Comédia Romântica', 2023, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt15489762%2F&psig=AOvVaw2KUl0_XsgYGGJ8BdnaD8-d&ust=1745511916999000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiaxefI7owDFQAAAAAdAAAAABAb'),
('Emilia Pérez', 'Rita, advogada frustrada, ajuda um líder de cartel a realizar uma cirurgia de redesignação sexual para fugir da polícia e começar uma nova vida.', '130', '16', 'Musical Criminal', 2024, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.posterflix.com.br%2Fprodutos%2Fposter-cartaz-emilia-perez%2F&psig=AOvVaw36WSJL56WRZDKcM1cdlnGq&ust=1745511986850000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIiT8YjJ7owDFQAAAAAdAAAAABAE'
);

-- Inserindo dados na tabela Sala
INSERT INTO Sala (numero_sala, tipo_sala, numero_assento, fileira) VALUES
(1, '3D', 100, 10),
(2, '2D', 80, 8),
(3, 'IMAX', 150, 15),
(4, 'VIP', 50, 5),
(5, 'Convencional', 90, 9
);

-- Inserindo dados na tabela Sessao
INSERT INTO Sessao (id_filme, id_sala, data_hora_inicio, data_hora_fim) VALUES
(1, 1, '2025-05-01 14:00:00', '2025-05-01 16:30:00'),
(2, 2, '2025-05-01 17:00:00', '2025-05-01 18:45:00'),
(3, 3, '2025-05-01 19:00:00', '2025-05-01 20:40:00'),
(4, 4, '2025-05-01 20:00:00', '2025-05-01 22:10:00'),
(5, 5, '2025-05-01 21:30:00', '2025-05-01 23:10:00'
);

-- Inserindo dados na tabela Cliente
INSERT INTO Cliente (nome_completo, email, senha, cpf, celular) VALUES
('Ana Clara Souza', 'ana.souza@email.com', 'senha123', '12345678901', '11999998888'),
('Bruno Martins', 'bruno.m@email.com', '123senha', '23456789012', '11988887777'),
('Carla Ribeiro', 'carla.r@email.com', 'minhasenha', '34567890123', '11977776666'),
('Diego Lopes', 'diego.l@email.com', 'senha321', '45678901234', '11966665555'),
('Eduarda Silva', 'edu.s@email.com', 'abc12345', '56789012345', '11955554444');

-- Inserindo dados na tabela Ingresso
INSERT INTO Ingresso (id_sessao, id_cliente, status_ingresso, preco_ingresso) VALUES
(1, 1, 'Confirmado', 25.00),
(2, 2, 'Cancelado', 20.00),
(3, 3, 'Confirmado', 30.00),
(4, 4, 'Pendente', 35.00),
(5, 5, 'Confirmado', 40.00);

-- Arrumando o erro de disponibilidade
ALTER TABLE Filme
ADD disponibilidade VARCHAR(20);
UPDATE Filme SET disponibilidade = 'Disponível' WHERE disponibilidade IS NULL;
ALTER TABLE Filme
ALTER COLUMN disponibilidade SET NOT NULL;

