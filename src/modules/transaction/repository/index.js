module.exports = (knex) => {
  const penaltyDetector = (earliestDate, latestDate) => {
    let differenceInTime = latestDate.getTime() - earliestDate.getTime();
    let differenceInDays = Math.round(
      differenceInTime / (1000 * 3600 * 24)
    );
    return differenceInDays;
  };
  module.checkAvailability = (body) => {
    return knex
      .select()
      .where("code", body.book_code)
      .andWhere("stock", ">", 0)
      .first()
      .table("book");
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
        const [transaction_id] = await trx
          .insert({
            book_id: body.book_code,
            checkin_date: new Date().toISOString().split("T")[0],
            status: 1,
            member_id: body.member_code,
          })
          .table("transaction");
        await trx
          .where("code", body.book_code)
          .decrement("stock", 1)
          .table("book");
        return transaction_id;
      });
    } catch (error) {
      console.error(error);
    }
  };
  module.checkOut = (body) => {
    try {
      return knex.transaction(async (trx) => {
        const update = await trx
          .update({
            checkout_date: new Date().toISOString().split("T")[0],
            status: 0,
          })
          .where({
            transaction_id: body.transaction_id,
            member_id: body.member_code,
            status: 1,
          })
          .table("transaction");
        if (update === 1) {
          let isPenalty = false;
          const trans = await trx
            .select()
            .where("transaction_id", body.transaction_id)
            .first()
            .table("transaction");
          const totalDays = await penaltyDetector(trans.checkin_date, trans.checkout_date);
          if(totalDays > 7) {
            isPenalty = true;
            const penalty = await trx
              .insert({
                member_id: body.member_code,
                issued_date: new Date().toISOString().split("T")[0],
              })
              .table("penalty");
          }
          await trx
            .where("code", trans.book_id)
            .increment("stock", 1)
            .table("book");
          const obj = {...trans, isPenalty};
          return obj;
        } else return [];
      });
    } catch (error) {
      console.error(error);
    }
  };
  module.getLatestTrans = (transaction_id) => {
    return knex
      .select()
      .where("transaction_id", transaction_id)
      .first()
      .table("transaction");
  };
  module.getLatestPenalty = (member_id) => {
    return knex
      .select()
      .where("member_id", member_id)
      .orderBy("issued_date", "desc")
      .first()
      .table("penalty");
  };
  module.getPenaltyRemaining = (penaltyDate) => {
    return penaltyDetector(penaltyDate, new Date())
  };
  return module;
};
