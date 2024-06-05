/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("member").del();
  await knex("member").insert([
    {
      code: "M001",
      name: "Angga",
    },
    {
      code: "M002",
      name: "Ferry",
    },
    {
      code: "M003",
      name: "Putri",
    },
  ]);
};
