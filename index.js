// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

server.listen(5000, () => {
  console.log("API up and running on port 5000");
});
