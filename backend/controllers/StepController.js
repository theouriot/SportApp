const ProgramModel = require("../models/Program");




async function createStep(id,body) {
    try {
        const name = body.name;
        const stepNumber = body.stepNumber;
        const image = body.image;
        const sets = body.sets;
        const reps = body.reps;
        const description = body.description;
        const recommandedTime = body.recommandedTime;

        const step = await ProgramModel.findByIdAndUpdate(
            {_id: id},
            {
                $push: {
                    steps: {
                        name: name,
                        stepNumber: stepNumber,
                        image: image,
                        sets: sets,
                        reps: reps,
                        description: description,
                        recommandedTime: recommandedTime
                    }
                }
            },{new: true }
        );
        return step;
    }
    catch (e) {
        throw e;
    }
}

async function getAllSteps() {
    try {
        const steps = await ProgramModel.find({steps: 1, _id:0});
        return steps[0].steps;
    } catch (e) {
        throw e;
    }
};

async function getStepsByProgram(id) {
    try{
        const steps = await ProgramModel.find({_id: id},{steps: 1, _id: 0});
        return steps[0].steps;
    } catch (e) {
        throw e;
    }
};

async function getStepById(id) {
    try{
        const step = await ProgramModel.findOne({_id: id});
        return step;
    } catch (e) {
        throw e;
    }
};

async function updateStep(id, body) {
    try {
        const res = await ProgramModel.updateOne({_id: id},
            {
                /* I prefer not to give the right to modify the programRef for more security */
                $set:{
                    "name": body.name,
                    "stepNumber":  body.stepNumber,
                    "image": body.image,
                    "sets":  body.sets,
                    "reps": body.reps,
                    "description": body.description,
                    "recommandedTime": body.recommandedTime
                },
            });
        return res
    } catch (e) {
        throw e;
    }
}

async function deleteStep(id) {
    try {
        const res = await ProgramModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createStep,
    getAllSteps,
    getStepsByProgram,
    getStepById, // TO DO
    updateStep, // TO DO
    deleteStep, // TO DO
};