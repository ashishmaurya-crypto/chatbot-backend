const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
var logger = require('morgan');
const app = express();
const router = require('./router')



// required modules
app.use(cors());   // for handling Cross-Origin Resource Sharing issues.
app.use(logger('dev'));  // it used to log requests, errors, and more to the console.
app.use(express.json());  // parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// to parse form data
var upload = multer();
app.use(upload.any());


// urls for routes
app.use('/', router);





// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });



module.exports = { app };