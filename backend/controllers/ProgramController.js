const ProgramModel = require("../models/Program");
const mongoose = require("mongoose");

async function createProgram(body) {
    try {
        const name = body.name
        const creator = body.creator
        const description = body.description;
        /* At the beginning there is no view and like */
        const likeCount = 0;
        const viewCount = 0;
        const image = body.image
        const steps = body.steps
        /* At the beginning there is no comments on an article */
        const comments = []
        const program = await ProgramModel.create({name,creator,description,likeCount,viewCount,image,steps,comments});
        return program;
    }
    catch (e) {
        throw e;
    }
}

async function getAllPrograms() {
    try {
        const programs = await ProgramModel.find();
        return programs;
    } catch (e) {
        throw e;
    }
};

async function getProgramById(id) {
    try{
        const program = await ProgramModel.findOne({_id: id});

        return program;
    } catch (e) {
        throw e;
    }
};

async function updateProgram(id, body) {
    try {
        const res = await ProgramModel.updateOne({_id: id},
            {
                $set:{
                    "name": body.name,
                    "creator": body.creator,
                    "description": body.description,
                    "content": body.content,
                    "image": body.image,
                    "steps": body.steps,
                    "comments": body.comments,
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function addView(id) {
    try {
        const res = await ProgramModel.updateOne({_id: id},
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
        const res = await ProgramModel.updateOne({_id: id},
            {
                $inc: { likeCount: 1 },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function deleteProgram(id) {
    try {
        const res = await ProgramModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createProgram,
    getAllPrograms,
    getProgramById,
    updateProgram,
    addView,
    addLike,
    deleteProgram,
};