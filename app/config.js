const package = require("../package.json");

module.exports = {
  APP: {
    name: package.name,
  },
  CONSTANTS: {
    HTTP_CODE: {
      OK: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      BAD_GATEWAY: 502,
    },
  },
  CORS_WHITELIST: [
    "http://localhost:3000",
    "https://spa.libtomsoftware.com",
    "https://spa.bertlock.net",
  ],
};
