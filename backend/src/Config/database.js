const mongoose = require('mongoose');
const keys = require('../keys');


mongoose.connect(keys.URL_MONGO)
  .then(db => console.log("Coneccion exitosa"))
.catch(err => console.error('No hay coneccion a la DB' ,err))