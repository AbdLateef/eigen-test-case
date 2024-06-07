module.exports = (app, usecase, memberUsecase) => {
  const searchBook = async (req, res) => {
    try {
      const body = {
        book_code: req.body.book_code,
      };
      const availability = await usecase.checkAvailability(body);
      res.send({
        data: availability ?? [],
        message: availability === undefined ? "The book not found" : "",
      });
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  const checkTransInprogress = async (req, res) => {
    try {
      const body = {
        book_codes: req.body.book_codes,
      };
      const data = await usecase.checkTransInprogress(req.params.member_code);
      if (data.length === 0) {
        res.statusCode = 404;
        res.send({
          data: [],
          message: "Transaction or member not found",
        });
      } else {
        res.send({
          data,
          message: "",
        });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  const checkIn = async (req, res) => {
    try {
      const body = {
        book_code: req.body.book_code,
        member_code: req.body.member_code,
      };
      // check whether the member exists
      const memberExists = await memberUsecase.getMemberByCode(
        req.body.member_code
      );
      if (memberExists === undefined) {
        res.statusCode = 404;
        res.send({
          data: [],
          message: "Invalid Member Code or Member is not existed",
        });
      } else {
        // check whether the mentioned books are avilable to be lent.
        const availableBook = await usecase.checkAvailability(body);
        // const availableBooks = checkAvailability.filter((item) => item.stock > 0);
        if (availableBook === undefined) {
          res.send({
            data: [],
            message: "the book you have input are not available at this moment",
          });
        } else {
          // check the current transaction, whether the lending has reached the maximum number.
          const currentTransaction = await usecase.checkTransInprogress(
            req.body.member_code
          );
          console.log(currentTransaction);
          if (currentTransaction.length >= 2) {
            res.send({
              data: currentTransaction,
              message: "You've reached maximum number of lending",
            });
          } else {
            // check whether the member is in penalty period
            const latestPenalty = await usecase.getLatestPenalty(
              req.body.member_code
            );
            const penaltyRemaining = await usecase.getPenaltyRemaining(
              latestPenalty.issued_date
            );
            if (penaltyRemaining <= 4) {
              res.send({
                data: [],
                message:
                  "You are in penalty period, you are not allowed to lend until finish the period",
              });
            } else {
              // all check passed
              // send data
              const transId = await usecase.checkIn(body);
              const latestTrans = await usecase.getLatestTrans(transId);
              res.send({
                data: {
                  transaction: latestTrans,
                },
                message:
                  "The mentioned book has been lent and recorded to our database",
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.send(error);
    }
  };
  const checkOut = async (req, res) => {
    const body = {
      transaction_id: req.body.transaction_id,
      member_code: req.body.member_code,
    };
    const data = await usecase.checkOut(body);
    if(data.length === 0) {
      res.statusCode = 404;
      res.send({
        data: data,
        message: "The transaction ID not found",
      });  
    } else {
      res.send({
        data: data,
        message: "The book has already been returned",
      });
    }
  };

  const allMemberTrans = async (_, res) => {
    const dataMember = await memberUsecase.getAllMembers();
    const arrTrans = [];
    for (const item of dataMember) {
      const dataTrans = await usecase.checkTransInprogress(item.code);
      arrTrans.push({
        member_code: item.code,
        member_name: item.name,
        transaction: dataTrans,
      });
    }
    res.send({
      data: arrTrans,
      message: "",
    });
  };

  app.post("/checkin", checkIn);
  app.post("/checkout", checkOut);
  app.post("/search", searchBook);
  app.get("/current-transaction/:member_code", checkTransInprogress);
  app.get("/transaction/all", allMemberTrans);
};
