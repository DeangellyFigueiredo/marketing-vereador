# pe-diabetico-backend

Configurações

- Criar uma base de dados para o projeto Vereador Marketing - Backend.

- Faça uma cópia do arquivo env.example

- Renomeie a cópia para .env

- Abra o arquivo. env que você acabou de criar e edite as variáveis de ambiente de acordo com as configurações do sistema onde o projeto vai ser instalado.

# Aplication

PORT_BACKEND=<porta_backend>

# Database

DATABASE_URL=sqlserver://<ip_do_banco>>:<port>;database=<db>>;user=<usuario>;password=<senha>;encrypt=true;trustServerCertificate=true

# true | false

MOCK_SERVER=true

<br /><br />

- Porta utilizada no back-end: 3029

## 1. Configuração de deploy back-end do projeto Vereador Marketing usando o Docker

Abra o terminal de comando do Ubuntu e navegue até pasta do projeto e execute o comando make build, conforme exemplo abaixo:

```sh
$ cd <diretorio_do_seu_projeto>
$ make build
```

## Comandos básicos para utilização do Vereador Marketing back-end no Docker

Para usar os comandos abaixo é necessário abrir o terminal de comando e navegar até a pasta do projeto Vereador Marketing - Backend back-end.

Executar o comando para buildar e criar o contêiner e iniciar o projeto Vereador Marketing - Backend back-end.

```sh
make build
```

Parar o serviço do Vereador Marketing - Backend back-end

```sh
make down

```

Iniciar o serviço do Vereador Marketing - Backend back-end

```sh
make up
```

Visualizar logs do Vereador Marketing - Backend back-end

```sh
make logs
```

Baixar atualizações do Vereador Marketing - Backend back-end (fazer o git pull, criar uma nova build, iniciar o projeto com as novas atualizações)

```sh
make deploy
```

<br>

## 2. Configuração de deploy back-end do projeto Vereador Marketing usando o Node.js

Executar o comando para instalar as dependências (criar a pasta node_modules) e iniciar o projeto Vereador Marketing - Backend back-end.

Abra a pasta do projeto com o terminal de comando e execute os comandos:

```sh
$ cd <this repository>
$ yarn
$ yarn start
```

## Comandos básicos para utilização do Vereador Marketing back-end no Node.Js

Para usar os comandos abaixo é necessário abrir o terminal de comando e navegar até a pasta do projeto Vereador Marketing - Backend back-end.

Abra a pasta do projeto com o terminal de comando

Executar o comando abaixo para instalar as dependências do projeto Vereador Marketing - Backend-BACKEND (criar a pasta node modules).

```sh
yarn
```

Executar o comando abaixo para iniciar o projeto Vereador Marketing - Backend-BACKEND.

```sh
yarn start
```

Executar o comando abaixo para parar o projeto Vereador Marketing - Backend-BACKEND.

```sh
CTRL+C ou fechar o terminal
```

Para baixar atualizações do Vereador Marketing - Backend back-end (fazer o git pull, iniciar o projeto com as novas atualizações)

```sh
$ git pull
$ yarn
$ yarn start
```
