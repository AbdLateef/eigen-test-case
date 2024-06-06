/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("penalty", function (table) {
    table.increments("penalty_id").notNullable().primary().unique();
    table.string("member_id").notNullable();
    table.date("issued_date").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("penalty");
};
