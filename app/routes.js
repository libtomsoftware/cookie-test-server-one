const express = require("express");
const responder = require("./responder");
const resources = require("./resources");
const { debitcards, healthcheck, webcookie } = resources;

module.exports = function routes() {
  const routes = new express.Router();

  routes.get("/healthcheck", healthcheck.get);
  routes.get("/webcookie", webcookie.get);
  routes.get("/debitcards", debitcards.get);
  routes.all("*", (req, res) => responder.rejectNotFound(res));

  return routes;
};
