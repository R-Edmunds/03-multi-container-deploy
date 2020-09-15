const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("oh hai");
});

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
