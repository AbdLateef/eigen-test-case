/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transaction", function (table) {
    table.increments("transaction_id").notNullable().primary().unique();
    table.string("book_id").notNullable();
    table.date("checkin_date").notNullable();
    table.date("checkout_date").nullable();
    table.string("status", 1).notNullable();
    table.string("member_id").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transaction");
};
