const moment = require("moment");
const responder = require("../../responder");
const CONFIG = require("../../config");

module.exports = (request, response) => {
  responder.send(
    response,
    request.get("origin"),
    {
      ...CONFIG.APP,
      ...{
        time: moment().format(),
      },
    },
    CONFIG.CONSTANTS.HTTP_CODE.OK
  );
};
