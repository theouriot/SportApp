const ProgramModel = require("../models/Program");
const ClientModel = require("../models/Client");
const ArticleModel = require("../models/Article");

async function createProgram(body) {
    try {
        const name = body.name
        const creator = body.creator
        const idCategory = body.idCategory
        const description = body.description;
        const idLevel = body.idLevel;
        /* At the beginning there is no view and like */
        const likeCount = 0;
        const viewCount = 0;
        const steps = [];
        /* At the beginning there is no comments on an article */
        const comments = [];
        const image = body.image;
        const timestamp = new Date().getTime();
        const program = await ProgramModel.create({name,creator,idCategory,idLevel,description,likeCount,viewCount,steps,comments,image,timestamp});
        console.log(program._id)
        return program._id;
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
                    "idCategory": body.idCategory,
                    "idLevel": body.idLevel,
                    "description": body.description,
                    "steps": body.steps,
                    "comments": body.comments,
                    "image": body.image
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function getAllProgramsByCoach(id) {
    try {
        const programs = await ProgramModel.find({creator: id});
        return programs;
    } catch (e) {
        throw e;
    }
};
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

async function addLike(id,idClient) {
    try {
        const client = await ClientModel.find( {_id: idClient},{ "follows.idProgram": 1, _id: 0});
        // We search if the client has already liked the program
        var alreadyLike = false;
        client[0].follows.forEach(element => {
            if(element.idProgram === id){
                alreadyLike = true;
            }
        }
        )
        // If no: we add the like to his list and to the program like list
        if(!alreadyLike){
            const res = await ProgramModel.updateOne({_id: id},
                {
                    $inc: { likeCount: 1 },
                });
            const clientRemove = await ClientModel.findByIdAndUpdate(
                {_id: idClient},
                {
                    $push: {
                        follows: {
                            idProgram: id,
                            idArticle: null
                        }
                    }
                },{new: true }
            );
            return res;
        }
        // If yes : we do nothing
        return null
    } catch (e) {
        throw e;
    }
}

async function addDislike(id,idClient) {
    try {
            const res = await ProgramModel.updateOne({_id: id},
                {
                    $inc: { likeCount: -1 },
                });
            const clientRemove = await ClientModel.findByIdAndUpdate(
                {_id: idClient},
                {
                    $pull: {
                        follows: {
                            idProgram: id,
                            idArticle: null
                        }
                    }
                }
            );

            return res;
    } catch (e) {
        throw e;
    }
}

async function hasAlreadyLiked(id,idClient) {
    try{
        const client = await ClientModel.find( {_id: idClient},{ "follows.idProgram": 1, _id: 0});
        // We search if the client has already liked the program
        var alreadyLike = false;
        client[0].follows.forEach(element => {
                if(element.idProgram === id){
                    alreadyLike = true;
                }
            }
        )
        return alreadyLike;
    } catch (e) {
        throw e;
    }
};


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
    getAllProgramsByCoach,
    updateProgram,
    addView,
    addLike,
    addDislike,
    deleteProgram,
    hasAlreadyLiked,
};