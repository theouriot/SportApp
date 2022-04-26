const StepModel = require("../models/Step");



async function createStep(body) {
    try {
        console.log(body)
        const name = body.name;
        const stepNumber = body.stepNumber;
        const image = body.image;
        const sets = body.sets;
        const reps = body.reps;
        const description = body.description;
        const recommandedTime = body.recommandedTime;

        const step = await StepModel.create({name,stepNumber,image,sets,reps,description,recommandedTime});
        return step;
    }
    catch (e) {
        throw e;
    }
}

async function getAllSteps() {
    try {
        const steps = await StepModel.find();
        return steps;
    } catch (e) {
        throw e;
    }
};

async function getStepById(id) {
    try{
        const step = await StepModel.findOne({_id: id});
        return step;
    } catch (e) {
        throw e;
    }
};

async function updateStep(id, body) {
    try {
        const res = await StepModel.updateOne({_id: id},
            {
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
        const res = await StepModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createStep,
    getAllSteps,
    getStepById,
    updateStep,
    deleteStep,
};