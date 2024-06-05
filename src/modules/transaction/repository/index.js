module.exports = (knex) => {
  module.checkAvailability = (body) => {
    return knex.select().whereIn("code", body.book_codes).table("book");
  };
  module.checkTransInprogress = (member_code) => {
    return knex
      .select()
      .where({
        member_id: member_code,
        status: 1,
      })
      .table("transaction");
  };
  module.checkIn = (body) => {
    try {
      return knex.transaction(async (trx) => {
        const arrBooks = [];
        body.book_codes.forEach((item) => {
          arrBooks.push({
            book_id: item,
            checkin_date: new Date().toISOString().split("T")[0],
            status: 1,
            member_id: body.member_code,
          });
        });

        await trx.insert(arrBooks).table("transaction");
        await trx.whereIn("code", body.book_codes).decrement("stock", 1).table("book");
      });
    } catch (error) {
      console.error(error);
    }
  };
  return module;
};
