const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./keys");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("oh hai");
});

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
