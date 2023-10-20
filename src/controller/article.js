const {
    updateArticle,
    findId,
    create,
    selectAllArticle,
    selectArticleByBlogger,
    selectArticle,
    searchArticle,
    countData,
    deleteArticle
} = require('../model/article')
const cloudinary = require("../middleware/cloudinary");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");


const commonHelper = require('../helper/common')

const articleController = {
    getAllArticle: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 100
            const offset = (page - 1) * limit
            const sortby = req.query.sortby || 'title'
            const sort = req.query.sort?.toUpperCase() || 'ASC'
            const search = req.query.search || ''

            if (search) {
                result = await searchArticle(search, limit, offset, sortby, sort)
                count = await countData(search)
            } else {
                result = await selectAllArticle(limit, offset, sortby, sort)
                count = await countData()
            }

            const totalData = parseInt(count)
            const totalPage = Math.ceil(totalData / limit)
            const pagination = {
                currentPage: page,
                limit,
                totalData,
                totalPage
            }

            commonHelper.response(
                res,
                result.rows,
                200,
                'get data success ',
                pagination
            )
        } catch (err) {
            console.log(err)
        }
    },
    getDetailArticle: async (req, res) => {
        try {
            const id = (req.params.article_id);
            const result = await selectArticle(id);

            commonHelper.response(res, result.rows, 200, 'get data success');
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    },
    createArticle: async (req, res) => {
        const {
            title,
            content,
            user_id
        } = req.body;
        const article_id = uuidv4();
        let banner = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            banner = result.secure_url;
        }
        const data = {
            title,
            content,
            banner,
            user_id,
            article_id
        };
        create(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Create article Success")
            )
            .catch((err) => res.send(err));
    },
    updateArticle: async (req, res) => {
        try {
            const {
                title,
                content,
                user_id
            } = req.body;
            const article_id = (req.params.article_id);
            const { rowCount } = await findId(article_id);
            if (!rowCount) {
                return (createError(403, "ID is Not Found"));
            }

            let banner = null;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                banner = result.secure_url;
            }

            const data = {
                title,
                content,
                banner,
                user_id,
                article_id
            };
            updateArticle(data)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Article updated")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    deleteArticle: async (req, res) => {
        try {
            const article_id = (req.params.article_id)
            const { rowCount } = await findId(article_id)
            if (!rowCount) {
                return res.json({ message: 'ID is Not Found' })
            }
            const result = await deleteArticle(article_id)
            commonHelper.response(res, result.rows, 200, 'Product deleted')
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    },

    getArticleBlogger: async (req, res) => {
        try {
            const user_id = req.params.user_id;
            const result = await selectArticleByBlogger(user_id);
            if (!result.rowCount) return commonHelper
            .response(res, null, 202, "User no havent article");
            commonHelper.response(res, result.rows, 200,
                "Get user article");
        } catch (error) {
            console.log(error);
            commonHelper.response(res, null, 500, "Failed getting user article");
        }
    },
}

module.exports = articleController