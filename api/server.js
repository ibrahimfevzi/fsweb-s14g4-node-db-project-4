const express = require("express");
const router = require("./tarifler/tarif-router");
const server = express();

server.use(express.json());

server.use("/api/tarifler", router);

module.exports = server;
