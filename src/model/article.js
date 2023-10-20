const pool = require("../config/db");

const create = (data) => {
    const { title, content, banner, user_id, article_id } = data;
    return pool.query(
        `INSERT INTO article (article_id,title,content,banner,user_id) VALUES ('${article_id}','${title}','${content}','${banner}','${user_id}')`
    );
};

const updateArticle = (data) => {
    const { title, content, banner, user_id, article_id } = data;
    return pool.query(
        `UPDATE article SET title='${title}',content='${content}',banner='${banner}',user_id='${user_id}' WHERE article_id='${article_id}'`
    );
};

const deleteArticle = (article_id) => {
    return pool.query(`DELETE FROM article WHERE article_id = '${article_id}'`)
}

const selectAllArticle = (limit, offset, sortby, sort) => {
    return pool.query(
        `SELECT
        a.article_id,
        a.title,
        a.content,
        a.banner,
        a.create_at,
        a.update_at,
        a.user_id,
        ub.nama AS author_name,
        ub.photo_profile
    FROM article a
    LEFT JOIN user_blog ub ON a.user_id = ub.user_id
    ORDER BY ${sortby} ${sort}
    LIMIT ${limit} OFFSET ${offset}`
    );
};

const selectArticleByBlogger = (user_id) => {
    return pool.query(`SELECT * FROM article WHERE user_id = '${user_id}'`);
}

const selectArticle = (id) => {
    return pool.query(`SELECT * FROM article WHERE article_id = '${id}'`)
  }

const findId = (article_id) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT article_id FROM article WHERE article_id='${article_id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const searchArticle = (search, limit, offset, sortby, sort) => {
    return pool.query(
        `SELECT * FROM article WHERE title ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    );
};

const countData = () => {
    return pool.query('SELECT COUNT(*) FROM article')
  }

module.exports = {
    updateArticle,
    findId,
    create,
    selectAllArticle,
    selectArticleByBlogger,
    selectArticle,
    updateArticle,
    searchArticle,
    countData,
    deleteArticle
};