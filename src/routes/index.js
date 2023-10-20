const express = require('express')
const router = express.Router()
const userRouter = require('../routes/users')
const articleRouter = require('../routes/article')

router.use('/users', userRouter)
router.use('/article',articleRouter)
module.exports = router
