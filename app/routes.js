const express = require("express");
const cors = require("cors");
const responder = require("./responder");
const resources = require("./resources");
const { debitcards, healthcheck, webcookie } = resources;
const CONFIG = require("./config");

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (CONFIG.CORS_WHITELIST.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
};

module.exports = function routes() {
  const routes = new express.Router();

  routes.get("/healthcheck", healthcheck.get);
  routes.get("/webcookie", cors(corsOptions), webcookie.get);
  routes.get("/debitcards", cors(corsOptions), debitcards.get);
  routes.all("*", (req, res) => responder.rejectNotFound(res));

  return routes;
};
