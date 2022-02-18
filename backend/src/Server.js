
const app = require('./App');


require('./Config/Database')


app.listen(app.get('port'), () => {
  console.log(`🚀 Servidor corriendo en el puerto:, http://localhost:${app.get('port')}`);
});