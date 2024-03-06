const responses = require('../lib/responses');

function responseHeaders(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
}
function logRequest(req, res, next) {
  console.log({ context: "API", msg: req.method + " " + req.url });
  next();
}
function globalErrorHandler(error, req, res, next) {
  console.log("Error caught in middleware: ", error);
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  }
  next();
}
function sendFailure(error, req, res, next) {
  if (error)
    return responses.sendFailure(
      req,
      res,
      responses.STATUS_CODE.BAD_REQUEST,
      error
    );
  next();
}
module.exports = {
  logRequest,
  responseHeaders,
  globalErrorHandler,
  sendFailure,
};
