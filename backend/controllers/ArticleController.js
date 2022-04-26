const ArticleModel = require("../models/Article");

async function createArticle(body) {
    try {
        const name = body.name
        const author = body.author
        const content = body.content
        /* At the beginning there is no view and like */
        const likeCount = 0;
        const viewCount = 0;
        const image = body.image

        const article = await ArticleModel.create({name, author, content,likeCount,viewCount,image });

        return article;
    }
    catch (e) {
        throw e;
    }
}


async function getAllArticles() {
    try {
        const articles = await ArticleModel.find();
        return articles;
    } catch (e) {
        throw e;
    }
};

async function getArticleById(id) {
    try{
        const articles = await ArticleModel.find({id});
        return articles;
    } catch (e) {
        throw e;
    }
};

async function updateArticle(id, body) {
    try {
        const res = await ArticleModel.updateOne({_id: id},
            {
                $set:{
                    "name": body.name,
                    "author": body.author,
                    "content": body.content,
                    "image": body.image,
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function deleteArticle(id) {
    try {
        const res = await ArticleModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};