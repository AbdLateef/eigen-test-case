module.exports = (repository) => {
  module.getAllBooks = () => {
    return repository.getAllBooks();
  };
  module.getBookByCode = (code) => {
    return repository.getBookByCode(code);
  };
  return module;
};
