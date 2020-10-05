const moment = require("moment"),
  responder = require("../../responder"),
  CONFIG = require("../../config");

module.exports = new (class HealthcheckResource {
  get(request, response) {
    responder.send(response, request.origin, {
      status: CONFIG.CONSTANTS.HTTP_CODE.OK,
      data: Object.assign({}, CONFIG.APP, {
        time: moment().format(),
      }),
    });
  }
})();
