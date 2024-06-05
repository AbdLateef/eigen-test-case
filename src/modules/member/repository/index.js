const table = "member";
module.exports = (knex) => {
  module.getAllMembers = () => {
    return knex.column("code", "name").select().table(table);
  };
  module.getMemberByCode = (code) => {
    return knex
      .column("code", "name")
      .select()
      .where("code", code)
      .first()
      .table(table);
  };
  return module;
};
