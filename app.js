const express = require('express');

const tourRouter = require('./router/tourRoute');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);

module.exports = app

