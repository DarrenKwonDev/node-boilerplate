const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const helmet = require("helmet");
const flash = require("connect-flash");
require("./database");

// router
const globalRouter = require("./routes/globalRoutes");
const apiRouter = require("./routes/apiRoutes");

// 관련 변수들
const app = express();
const PORT = process.env.PORT;
const SECRET = process.env.COOKIE_SECRET;
const sessionOption = {
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOny: true,
    secure: false,
  },
};
if (process.env.NODE_ENV === "production") {
  // proxy 서버를 사용한다면 true값을 주자.
  sessionOption.proxy = true;
  // Secure는 https로 통신하는 경우만 웹브라우저가 쿠키를 서버로 전송하는 옵션입니다.
  // 여기서는 https를 사용하지 않으므로 주석 처리합니다.
  // sessionOption.cookie.secure = true;
}

// middleware
app.use(helmet());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  // development
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(SECRET));
app.use(session(sessionOption));
app.use(flash());

// view engine
app.set("views", path.join(__dirname, "views")); //views 폴더 생성해야 함
app.set("view engine", "pug");

// routes
app.use("/", globalRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
