const helpers = require("../../helpers");
const responder = require("../../responder");
const CONFIG = require("../../config");
const cookiesStorage = require("../../cookies");

const generateCookieData = () => {
  return {
    name: `iam_` + helpers.generateRandomString(5, false).toLowerCase(),
    value: helpers.generateRandomString(50, true).toLowerCase(),
  };
};

module.exports = (request, response) => {
  const requestCookies = request.cookies || [];

  if (requestCookies.length) {
    console.log("request cookies:", requestCookies);
    console.log("COOKIES STORAGE", cookiesStorage.getAll());
    //cookiesStorage.remove(cookieName)
  }

  const data = generateCookieData();
  const webcookie = {
    name: data.name,
    value: data.value,
    maxAge: 300000,
    isHttpOnly: true,
    isSecure: true,
    sameSite: "strict",
  };

  cookiesStorage.add(webcookie);

  responder.send(
    response,
    request.get("origin"),
    data,
    CONFIG.CONSTANTS.HTTP_CODE.OK,
    [webcookie]
  );
};
