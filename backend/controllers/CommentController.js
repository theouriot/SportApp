const ArticleModel = require("../models/Article");

async function createComment(id,body) {
    try {
        const author = body.author;
        const content = body.content;
        const comment = await ArticleModel.findByIdAndUpdate(
            {_id: id},
            {
                $push: {
                    comments: {
                        author: author,
                        content: content,
                        timestamp: new Date().getTime(),
                    }
                }
            },{new: true }
            );
        return comment;
    }
    catch (e) {
        throw e;
    }
}

async function getAllComments() {
    try {
        const comments = await ArticleModel.find( { },{comments: 1, _id: 0});
        return comments[0].comments;
    } catch (e) {
        throw e;
    }
};

async function getCommentById(id) {
    try{
        const comment = await ArticleModel.findOne({}, {comments: 1, _id: id});
        return comment;
    } catch (e) {
        throw e;
    }
};

async function getCommentsByArticle(id) {
    try{
        const comments = await ArticleModel.find({_id: id},{comments: 1, _id: 0});
        return comments[0].comments;
    } catch (e) {
        throw e;
    }
};

async function updateComment(id, body) {
    try {
        const res = await ArticleModel.updateOne({_id: id},
            {
                /* I prefer not to give the right to modify the programRef for more security */
                $set:{
                    "content": body.content
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function deleteComment(id) {
    try {
        const res = await ArticleModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment, //TO DO
    deleteComment, //TO DO
    getCommentsByArticle,
};