const { Router } = require('express');


const router = Router();



router.use('/users', require('./Users'))


module.exports = router;