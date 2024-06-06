const express = require("express");
const mysql = require("mysql2");
const app = express();
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const port = 3001;
const knex = require("./knex");
const http = require("./modules/http");
const repository = require("./modules/repository");
const usecase = require("./modules/usecase");

app.use(express.json());

// domain
const booksRepo = repository.newBooksRepository(knex);
const booksUsecase = usecase.newBooksUseCase(booksRepo);
http.newBooksController(app, booksUsecase);

const membersRepo = repository.newMembersRepository(knex);
const membersUseCase = usecase.newMembersUseCase(membersRepo);
http.newMembersController(app, membersUseCase);

const transRepo = repository.newTransactionRepository(knex);
const transUseCase = usecase.newTransactionUseCase(transRepo);
http.newTransactionController(app, transUseCase, membersUseCase);

// swagger part
const swaggerDocument = require("./swagger.json");
app.use(
  "/",
  swaggerui.serve,
  swaggerui.setup(swaggerDocument)
)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
