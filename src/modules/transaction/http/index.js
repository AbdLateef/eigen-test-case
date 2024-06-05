module.exports = (app, usecase) => {
  const searchBook = async (req, res) => {
    try {
      const body = {
        book_codes: req.body.book_codes,
      };
      const availability = await usecase.checkAvailability(body);
      const data = availability.filter((item) => item.stock > 0);
      res.send(data);
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
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  const checkIn = async (req, res) => {
    try {
      const body = {
        book_codes: req.body.book_codes,
        member_code: req.body.member_code,
      };

      // check whether the mentioned books are avilable to be lent.
      const checkAvailability = await usecase.checkAvailability(body);
      const availableBooks = checkAvailability.filter((item) => item.stock > 0);
      if (availableBooks.length === 0) {
        res.send({
          data: [],
          message: "the books you have input are not available at this moment",
        });
      } else {
        // check the current transaction, whether the lending has reached the maximum number.
        const currentTransaction = await usecase.checkTransInprogress(
          req.body.member_code
        );
        if (currentTransaction.length >= 2) {
          res.send({
            data: currentTransaction,
            message: "You've reached maximum number of lending",
          });
        } else {
          // check whether the member is in penalty period
          // all check passed
          // re-build body
          const filter = [];
          availableBooks.forEach((item) => {
            filter.push(item.code);
          });
          const filteredBookCodes = filter.filter((x) =>
            body.book_codes.includes(x)
          );
          const newBody = {
            book_codes: filteredBookCodes,
            member_code: req.body.member_code,
          };

          // send data
          const data = await usecase.checkIn(newBody);
          res.send({
            data: availableBooks,
            message:
              "The mentioned books have been lent and recorded to our database",
          });
        }
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  const checkout = async (res, req) => {
    // return the book here
  };
  app.post("/checkin", checkIn);
  app.post("/search", searchBook);
  app.get("/current-transaction/:member_code", checkTransInprogress);
};
