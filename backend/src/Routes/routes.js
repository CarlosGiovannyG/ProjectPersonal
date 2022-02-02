const { Router } = require('express');


const router = Router();

router.post('/suscription', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message:'Recibido'});
})

router.use('/users', require('./users'))


module.exports = router;