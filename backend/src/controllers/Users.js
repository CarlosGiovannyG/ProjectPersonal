const model = require('../models')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const keys = require('../Keys');


module.exports = {
  async register(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, Number(keys.rounds));
      const avatar = md5(req.body.email)

      await model.Users.create({
        username: req.body.username,
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: Number(req.body.phone),
        password: password,
        rool: req.body.rool,
        avatar: avatar,
      })
        .then(user => {
          user ? res.json({ message: 'registro exitoso' }) :
            res.status(500).send({ messageError: 'Ocurrio un error inesperado' })
        }, error => {
          next(error);
        }
        )
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};