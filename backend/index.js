"use strict"
const cors = require('cors');
global.config = require('config');
const express = require('express');
const app = express();
const { logRequest, responseHeaders, globalErrorHandler , sendFailure} = require("./middlewares");
app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(express.json({ limit: '50mb' }));


app.use(logRequest);
app.use(responseHeaders);
app.use(globalErrorHandler);
app.use(sendFailure);


global.app = app;

const startupService = require('./lib/init');
startupService.initializeServer();

