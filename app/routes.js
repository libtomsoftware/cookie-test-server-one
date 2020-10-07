const express = require("express");
const cors = require("cors");
const path = require("path");
const helpers = require("./helpers");
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
  routes.get("/bootstrap", function (req, res) {
    const cookie = {
      name: "iam_dummy_" + helpers.generateRandomString(5, false).toLowerCase(),
      value: helpers.generateRandomString(50, true).toLowerCase(),
      isHttpOnly: true,
      isSecure: true,
      sameSite: "None",
    };
    res.cookie(cookie.name, cookie.value, {
      httpOnly: cookie.isHttpOnly,
      secure: cookie.isSecure,
      sameSite: cookie.sameSite,
    });
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  routes.all("*", (req, res) => responder.rejectNotFound(res));

  return routes;
};
