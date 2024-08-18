var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var env = require("dotenv");
env.config(); // This will load the environment variables from the .env file
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const connection = require("./db/connection");

connection();

// mongoose.connect(process.env.DB_URL);
// console.log(process.env.SUCCESS_MSG);

// const client = new MongoClient(process.env.DB_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
//
// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log(process.env.SUCCESS_MSG);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir); // This will catch any errors that occur during the connection process

var indexRouter = require("./routes/index");
/**
 * This is a sample route that will be used to get all the products
 */
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/product");
var orderRouter = require("./routes/order");

var app = express();

/**
 * This is a middleware function that will be executed for every request to the app.
 */

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
/**
 * This is a sample route that will be used to get all the products
 */
app.use("/products", productsRouter);
app.use ("/orders", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

// mongodb+srv://jayasekarasavinda44:LAn9leT0PobHA29Y@training1.6uhan9j.mongodb.net/?retryWrites=true&w=majority&appName=training1
