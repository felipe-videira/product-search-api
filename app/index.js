require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressSwagger = require('express-swagger-generator');
const { version } = require('../package.json');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const swagger = expressSwagger(app);

swagger({
  swaggerDefinition: {
    info: {
      title: 'Product Search API',
      version,
    },
    basePath: '/api',
    produces: [
      'application/json',
      'application/xml',
    ],
    schemes: ['https'],
    securityDefinitions: {},
  },
  basedir: __dirname,
  files: ['./routes/**/*.js'],
});

app.use('/api', routes);

module.exports = app;
