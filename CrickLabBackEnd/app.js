require("dotenv").config();
require("./db/config");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { Server } = require("socket.io");
const passport = require("passport");
var session = require("express-session");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var seriesRouter = require("./routes/series");
var matchRouter = require("./routes/match");
var teamsRouter = require("./routes/team");
var playersRouter = require("./routes/player");
var scorecardRouter = require("./routes/scorecard");
var newsRouter = require("./routes/news");
const { createServer } = require("http");

var app = express();

var httpServer = createServer(app);
var io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(
  session({
    secret: "12345-67890-09876-54321", // Replace with a secret key for session management
    resave: false,
    saveUninitialized: false,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/series", seriesRouter);
app.use("/match", matchRouter);
app.use("/teams", teamsRouter);
app.use("/players", playersRouter);
app.use("/scorecard", scorecardRouter);
app.use("/news", newsRouter);

// creating the connection with socket.io
let match = {
  run: 0,
  ball: 0,
  active: [],
  out: [],
  baller: [],
  playerScore: [],
};
io.on("connection", (socket) => {
  // Handle custom events
  socket.on("scoreUpdated", (newScores) => {
    match = newScores;
    io.emit("scoreUpdated", newScores); // Broadcast the message to all connected clients
  });

  io.emit("scoreUpdated", match);
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

io.listen(3001, () => {
  console.log("Socket.io server is running on port 3001");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
