const ClientModel = require("../../models/Client");
const bcrypt = require("bcryptjs");

async function getAllClients() {
    try {
        const clients = await ClientModel.find();
        return clients;
    } catch (e) {
        throw e;
    }
};

async function getClientById(id) {
    try{
        const clients = await ClientModel.find({_id: id});
        return clients;
    } catch (e) {
        throw e;
    }
};

async function updateClient(id,body) {
    try {

        /* Hashing password */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)

        const res = await ClientModel.updateOne({_id: id},
            {
                $set:{
                    "alias": body.alias,
                    "email": body.email,
                    "password": hashedPassword,
                    "age": body.age,
                    "weight": body.weight,
                    "height": body.height,
                    "profilePicture": body.profilePicture,
                    "follows": body.follows
                },
            });
        return res
    } catch (e) {
        throw e;
    }
};

async function deleteClient(id) {
    try {
        const res = await ClientModel.deleteOne({ _id: id }).exec();
        return res;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
};