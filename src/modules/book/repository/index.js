const table = "book";
module.exports = (knex) => {
  module.getAllBooks = () => {
    return knex
      .column("code", "title", "author", "stock")
      .select()
      .table(table);
  };
  module.getBookByCode = (code) => {
    return knex
      .column("code", "title", "author", "stock")
      .select()
      .where("code", code)
      .first()
      .table(table);
  };
  return module;
};
