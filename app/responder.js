const CONFIG = require("./config");
const STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;
const allowedOrigins = CONFIG.CORS_WHITELIST;

function addHeaders(response, origin) {
  response.headers = {
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  };

  if (allowedOrigins.includes(origin)) {
    response.headers = {
      ...response.headers,
      ...{
        "Access-Control-Allow-Origin": origin,
      },
    };
  }

  return response;
}

class Responder {
  rejectUnauthorized(response, origin) {
    response = addHeaders(response, origin);
    response.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }

  rejectBadGateway(response, origin) {
    response = addHeaders(response, origin);
    response.sendStatus(STATUS_CODE.BAD_GATEWAY);
  }

  rejectConflict(response, origin) {
    response = addHeaders(response, origin);
    response.sendStatus(STATUS_CODE.CONFLICT);
  }

  rejectNotFound(response, origin) {
    response = addHeaders(response, origin);
    response.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  rejectBadRequest(response, origin) {
    response = addHeaders(response, origin);
    response.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  reject(response, origin, statusCode) {
    response.statusCode = statusCode;
    response = addHeaders(response, origin);

    response.send();
  }

  sendSuccess(response, origin) {
    response = addHeaders(response, origin);
    response.sendStatus(STATUS_CODE.OK);
  }

  send(response, origin, data, statusCode, cookies) {
    response.statusCode = statusCode || STATUS_CODE.OK;
    response = addHeaders(response, origin);

    if (cookies && cookies.length) {
      cookies.forEach((cookie) => {
        response.cookie(cookie.name, cookie.value, {
          maxAge: cookie.maxAge,
          httpOnly: cookie.isHttpOnly,
          secure: cookie.isSecure,
        });
      });
    }

    response.send(data);
  }
}

module.exports = new Responder();
