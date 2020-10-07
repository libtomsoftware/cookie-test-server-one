const responder = require("../../responder");
const CONFIG = require("../../config");
const cookies = require("../../cookies");

module.exports = (request, response) => {
  const requestCookies = Object.keys(request.cookies) || [];
  const cookiesToExpire = [];

  if (requestCookies.length) {
    requestCookies.forEach((name) => {
      if (name.indexOf("iam_") !== -1) {
        const cookie = {
          name,
          value: request.cookies[name],
          maxAge: 0,
          expires: new Date(0),
          sameSite: "None",
          httpOnly: true,
          secure: true,
          domain: "bertlock.net",
        };

        cookiesToExpire.push(cookie);
        cookies.remove(cookie.name);
        console.log("removing cookie", cookie);
      }
    });
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
    [webcookie, ...cookiesToExpire]
  );
};
