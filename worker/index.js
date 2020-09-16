const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000 // on failure, attempt reconnect every second
});

const sub = redisClient.duplicate();

const fib = (idx) => {
  if (idx < 2) return 1;
  return fib(idx - 1) + fib(idx - 2);
};

sub.on("message", async (channel, message) => {
  const fibResult = await fib(parseInt(message));
  redisClient.hset("values", message, fibResult);
});

sub.subscribe("insert");
