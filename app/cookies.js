const helpers = require("./helpers");
const webcookies = [];

const generate = (params) => {
  const {
    maxAge = 300000,
    isHttpOnly = false,
    isSecure = false,
    sameSite = "None",
  } = params;

  const cookie = {
    name: `iam_` + helpers.generateRandomString(5, false).toLowerCase(),
    value: helpers.generateRandomString(50, true).toLowerCase(),
    maxAge,
    isHttpOnly,
    isSecure,
    sameSite,
  };

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
