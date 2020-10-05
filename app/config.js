const package = require("../package.json");
const allowedOriginsFromEnv = [
  process.env.ALLOWED_ORIGIN_ONE,
  process.env.ALLOWED_ORIGIN_TWO,
  process.env.ALLOWED_ORIGIN_THREE,
];

module.exports = {
  ALLOWED_ORIGINS: allowedOriginsFromEnv.filter((origin) => !!origin),
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
};
