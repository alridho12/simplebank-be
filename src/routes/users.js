const express = require('express')
const router = express.Router()
const userController = require('../controller/users')
const uploadProfile = require("../middleware/uploadProfile");

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .get('/:user_id', userController.getDetailUser)
  .post('/refreshToken', userController.refreshToken)
  .put('/:user_id',uploadProfile,userController.updateUser)

module.exports = router
