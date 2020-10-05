const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const whitelist = [
  "http://localhost:3000",
  "https://spa.libtomsoftware.com",
  "https://spa.bertlock.net",
];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors(corsOptions));
app.use(routes());

module.exports = app;
