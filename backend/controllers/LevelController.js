const LevelModel = require("../models/Level");

async function createLevel(body) {
    try {
        const name = body.name;
        const level = await LevelModel.create({name});
        return level;
    }
    catch (e) {
        throw e;
    }
}

async function getAllLevels() {
    try {
        const levels = await LevelModel.find();
        return levels;
    } catch (e) {
        throw e;
    }
};

async function getLevelById(id) {
    try{
        const level = await LevelModel.findOne({_id: id});
        return level;
    } catch (e) {
        throw e;
    }
};

async function updateLevel(id, body) {
    try {
        const res = await LevelModel.updateOne({_id: id},
            {
                $set:{
                    "name": body.name
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function deleteLevel(id) {
    try {
        const res = await LevelModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createLevel,
    getAllLevels,
    getLevelById,
    updateLevel,
    deleteLevel,
};