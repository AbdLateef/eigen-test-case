module.exports = (app, usecase) => {
  const getAllBooks = async (_, res) => {
    try {
      const data = await usecase.getAllBooks();
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  const getBookByCode = async (req, res) => {
    try {
      const data = await usecase.getBookByCode(req.params.code);
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  app.get("/books", getAllBooks);
  app.get("/books/:code", getBookByCode);
};
