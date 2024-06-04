const express = require("express");
const app = express();
const port = 3001;

app.use("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
