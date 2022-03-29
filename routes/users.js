var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users')

/* GET users listing. */
router.post('/', UserController.createUser);

module.exports = router;
