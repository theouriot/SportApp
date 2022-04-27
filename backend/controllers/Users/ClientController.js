const ClientModel = require("../../models/Client");

async function getAllClients() {
    try {
        const clients = await ClientModel.find();
        return clients;
    } catch (e) {
        throw e;
    }
};

async function getClientByAlias(alias) {
    try{
        const clients = await ClientModel.find({alias});
        return clients;
    } catch (e) {
        throw e;
    }
};

async function updateClient(id,body) {
    try {
        const res = await ClientModel.updateOne({_id: id},
            {
                $set:{
                    "alias": body.alias,
                    "email": body.email,
                    "password": body.password
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
    getClientByAlias,
    updateClient,
    deleteClient,
};