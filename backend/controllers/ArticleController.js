const ArticleModel = require("../models/Article");

async function createArticle(body) {
    try {
        const name = body.name
        const author = body.author
        const description = body.description;
        const content = body.content
        /* At the beginning there is no view and like */
        const likeCount = 0;
        const viewCount = 0;
        const image = body.image;
        const comments = [];
        const article = await ArticleModel.create({name,author,description,content,likeCount,viewCount,image,comments});
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

async function getAllArticlesByCoach(id) {
    try {
        console.log(id)
        const articles = await ArticleModel.find({author: id});
        console.log(articles)
        return articles;
    } catch (e) {
        throw e;
    }
};

async function getArticleById(id) {
    try{
        const article = await ArticleModel.findOne({_id: id});

        return article;
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
                    "description": body.description,
                    "content": body.content,
                    "image": body.image,
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function addView(id) {
    try {
        const res = await ArticleModel.updateOne({_id: id},
            {
                $inc: { viewCount: 1 },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function addLike(id) {
    try {
        const res = await ArticleModel.updateOne({_id: id},
            {
                $inc: { likeCount: 1 },
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
    getAllArticlesByCoach,
    getArticleById,
    updateArticle,
    addView,
    addLike,
    deleteArticle,
};