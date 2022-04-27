const ClientModel = require("../../models/Coach");
const mongoose = require("mongoose");

async function getAllCoaches() {
    try {
        const clients = await ClientModel.find();
        return clients;
    } catch (e) {
        throw e;
    }
};

async function getCoachByAlias(alias) {
    try{
        const clients = await ClientModel.find({alias});
        return clients;
    } catch (e) {
        throw e;
    }
};

async function updateCoach(id,body) {
    try {
        const res = await ClientModel.updateOne({_id: id},
            {
                $set:{
                    "alias": body.alias,
                    "email": body.email,
                    "password": body.password,
                    "followers": body.followers,
                    "programs": body.programs,
                    "articles": body.articles,
                    "profilePicture": body.profilePicture,
                },
            });
        return res
    } catch (e) {
        throw e;
    }
};

async function deleteCoach(id) {
    try {
        const res = await ClientModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getAllCoaches,
    getCoachByAlias,
    updateCoach,
    deleteCoach,
};