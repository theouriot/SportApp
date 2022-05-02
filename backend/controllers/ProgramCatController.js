const ProgramCatModel = require("../models/ProgramCat");

async function createProgramCat(body) {
    try {
        const name = body.name;
        const step = await ProgramCatModel.create({name});
        return step;
    }
    catch (e) {
        throw e;
    }
}

async function getAllProgramCats() {
    try {
        const steps = await ProgramCatModel.find();
        return steps;
    } catch (e) {
        throw e;
    }
};

async function getProgramCatById(id) {
    try{
        const step = await ProgramCatModel.findOne({_id: id});
        return step;
    } catch (e) {
        throw e;
    }
};

async function updateProgramCat(id, body) {
    try {
        const res = await ProgramCatModel.updateOne({_id: id},
            {
                /* I prefer not to give the right to modify the programRef for more security */
                $set:{
                    "name": body.name
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function deleteProgramCat(id) {
    try {
        const res = await ProgramCatModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createProgramCat,
    getAllProgramCats,
    getProgramCatById,
    updateProgramCat,
    deleteProgramCat,
};