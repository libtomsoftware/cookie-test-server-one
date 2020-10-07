const responder = require("../../responder");
const CONFIG = require("../../config");

module.exports = (request, response) => {
  console.log("request cookies");
  console.log(request.cookies);
  responder.send(
    response,
    request.get("origin"),
    {
      debitcards: [],
    },
    CONFIG.CONSTANTS.HTTP_CODE.OK
  );
};
