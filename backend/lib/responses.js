exports.responseMessages = {
    INTERNAL_ERROR: "Some Internal Error Occured",
    PARAMETER_MISSING: "Parameter Missing",
    BOOK_NOT_AVAILABLE: "Book Does not Exists in Library"
};

exports.responseFlags = {
    NO_DATA_SUCCESS: 201,
    PARAMETER_MISSING: 400,
    SERVER_ERROR: 503,
    SUCCESS: 200,
    UNAUTHORIZED_CREDENTIALS: 401,
    WRONG_OTP: 401,
    INVALID_SUBJECT: 201,
    INVALID_TOPIC: 201
};

exports.sendCustomResponse = function (res, message, status, data) {
    message = message ? message : module.exports.responseMessages.SUCCESS;
    status = status ? status : module.exports.responseFlags.SUCCESS;
    data = data ? data : {};
    res.send({
        message,
        status,
        data
    });
}

exports.sendSuccess = function (res, message, status, data) {
    message = message ? message : module.exports.responseMessages.SUCCESS;
    status = status ? status : module.exports.responseFlags.SUCCESS;
    data = data ? data : {};
    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
}

exports.sendFailure = function (res, message, status, data) {
    message = message;
    status = status ? status : module.exports.responseFlags.PARAMETER_MISSING;
    data = data ? data : {};
    res.status(status).send({
        status: status,
        message: message,
        data: data,
      });
}

exports.STATUS_CODE={
	CONTINUE:210,
	SWITCHING_PROTOCOLS:201,
	PROCESSING:202,
	SUCCESS:200,
	CREATED:203,
	UNAUTHORIZED:401,
	FORBIDDEN:401,
	ACCESS_NOT_ALLOWED:403,
	NOT_FOUND:205,
	RUNDOWN_ERROR:212,
	EMPTY_DATA:212,
	NOT_ACCEPTABLE:206,
	CONFLICT:207,
	BAD_REQUEST:400,
	UNPROCESSABLE_ENTITY:209, 
	INTERNAL_SERVER_ERROR:500,
	NOT_IMPLEMENTED:501,
	SERVICE_UNAVAILABLE:503,
	GATEWAY_TIME_OUT:504
};