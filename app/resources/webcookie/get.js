const responder = require("../../responder");
const CONFIG = require("../../config");
const cookies = require("../../cookies");

module.exports = (request, response) => {
  const requestCookies = request.cookies || [];

  if (requestCookies.length) {
    console.log("request cookies:", requestCookies);
    console.log("COOKIES STORAGE", cookiesStorage.getAll());
    //cookies.remove(cookieName)
  }

  const webcookie = cookies.generate({
    maxAge: 300000,
    isHttpOnly: true,
    isSecure: true,
    sameSite: "None",
  });

  cookies.add(webcookie);

  responder.send(
    response,
    request.get("origin"),
    webcookie,
    CONFIG.CONSTANTS.HTTP_CODE.OK,
    [webcookie]
  );
};
