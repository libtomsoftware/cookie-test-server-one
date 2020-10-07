const helpers = require("./helpers");
const webcookies = [];

const generate = (params) => {
  const {
    isHttpOnly = false,
    isSecure = false,
    sameSite = "None",
    maxAge,
    domain,
  } = params;

  const cookie = {
    name: `iam_` + helpers.generateRandomString(5, false).toLowerCase(),
    value: helpers.generateRandomString(50, true).toLowerCase(),
    isHttpOnly,
    isSecure,
    sameSite,
  };

  if (domain) {
    cookie.domain = domain;
  }

  if (maxAge) {
    cookie.maxAge = maxAge;
  }

  return cookie;
};

const add = (cookie) => {
  webcookies.push(cookie);
};

const getAll = () => {
  return webcookies;
};

const remove = (cookieName) => {
  let index;

  webcookies.forEach((webcookie, idx) => {
    if (webcookie.name === cookieName) {
      index === idx;
    }
  });

  if (!!index || index === 0) {
    webcookies.splice(index, 1);
  }
};

module.exports = {
  add,
  getAll,
  remove,
  generate,
};
