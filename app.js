const dotenv = require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import helmet from "helmet";
import flash from "connect-flash";

// router
import globalRouter from "./routes/globalRoutes";

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

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
