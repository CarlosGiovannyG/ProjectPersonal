const mongoose = require('mongoose');
const keys = require('../Keys');


mongoose.connect(keys.URL_MONGO)
  .then(db => console.log("Coneccion exitosa"))
.catch(err => console.error('No hay coneccion a la DB' ,err))