const CommentModel = require("../models/Comment");

async function createComment(body) {
    try {
        const name = body.name;
        const comment = await CommentModel.create({name});
        return comment;
    }
    catch (e) {
        throw e;
    }
}

async function getAllComments() {
    try {
        const comments = await CommentModel.find();
        return comments;
    } catch (e) {
        throw e;
    }
};

async function getCommentById(id) {
    try{
        const comment = await CommentModel.findOne({_id: id});
        return comment;
    } catch (e) {
        throw e;
    }
};

async function updateComment(id, body) {
    try {
        const res = await CommentModel.updateOne({_id: id},
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
        const res = await CommentModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
};