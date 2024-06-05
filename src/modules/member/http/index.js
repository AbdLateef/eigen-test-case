module.exports = (app, usecase) => {
  const getAllMembers = async (_, res) => {
    try {
      const data = await usecase.getAllMembers();
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  const getMemberByCode = async (req, res) => {
    try {
      const data = await usecase.getMemberByCode(req.params.code);
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };
  app.get("/members", getAllMembers);
  app.get("/members/:code", getMemberByCode);
};
