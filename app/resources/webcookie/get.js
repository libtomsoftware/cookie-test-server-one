const responder = require("../../responder");
const CONFIG = require("../../config");
const cookies = require("../../cookies");

module.exports = (request, response) => {
  const requestCookies = request.cookies || [];

  console.log("request.cookies", request.cookies);

  if (requestCookies.length) {
    console.log("COOKIES STORAGE", cookiesStorage.getAll());
    //cookies.remove(cookieName)
  }

  const webcookie = cookies.generate({
    isHttpOnly: true,
    isSecure: true,
    sameSite: "None",
    domain: "bertlock.net",
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
