const { Router } = require('express');
const Controllers = require('../controllers');
const upload = require('../libs/Storage')


const router = Router();


router.post('/register', Controllers.register)



module.exports = router;