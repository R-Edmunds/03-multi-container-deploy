const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const { pgPort } = require("./keys");
const redis = require("redis");

const keys = require("./keys");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8000;

// Postgres

const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase,
  user: keys.pgUser,
  password: keys.pgPassword
});
pgClient.on("connect", () => {
  pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

// Redis

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000 // on fail, reconnect every second
});
const redisPublisher = redisClient.duplicate();

// Express routes

app.get("/", (req, res) => {
  res.send("oh hai");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient
    .query("SELECT * FROM values")
    .catch((err) => console.error(err));
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const idx = req.body.idx;
  if (parseInt(idx) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.hset("values", idx, "Nothing yet!");
  redisPublisher.publish("insert", idx);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [idx]);

  res.send({ working: true });
});

app.listen(PORT, (err) => {
  console.log(`Express server listening on port: ${PORT}`);
});
