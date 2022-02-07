const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const swaggerDoc = require('./Documentation/swagger.json')
const swaggerUI = require('swagger-ui-express');
const favicon = require('serve-favicon');

const app = express();

app.set('port', process.env.PORT || 4000)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'Public', 'favicon.ico')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API_KEY, Origin, X-Requested-With, Content-Type, Accep, Acces - COntrol - allow - Request - Method"
  );
  res.header("Access-Control-Allow-Requested-Methods", "GET, POST, PUT, DELETE");
  res.header("Allow", "GET, POST,OPTIONS,PUT,DELETE");
  next()
});


app.get('/', (req, res) => {
  res.json({ message: 'Pagina cargada con exito' })
})

app.use('/', require('./Routes/Routes'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = app;