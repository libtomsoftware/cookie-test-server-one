const responder = require("../../responder");
const CONFIG = require("../../config");

module.exports = (request, response) => {
  responder.send(
    response,
    request.get("origin"),
    {
      debitcards: [],
    },
    CONFIG.CONSTANTS.HTTP_CODE.OK
  );
};
