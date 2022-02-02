
const app = require('./app');


require('./Config/database')


app.listen(app.get('port'), () => {
  console.log(`🚀 Servidor corrinedo en el puerto:, http://localhost:${app.get('port')}`);
});