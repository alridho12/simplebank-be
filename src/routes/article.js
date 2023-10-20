const express = require('express')
const router = express.Router()
const articleController = require('../controller/article')
const uploadBanner = require("../middleware/uploadBanner");

router
    .post('/',uploadBanner, articleController.createArticle)
    .get('/', articleController.getAllArticle)
    .get('/:article_id',articleController.getDetailArticle)
    .get('/user/:user_id',articleController.getArticleBlogger)
    .put('/:article_id',uploadBanner,articleController.updateArticle)
    .delete('/:article_id',articleController.deleteArticle)

module.exports = router
