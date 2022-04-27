const ClientModel = require('../../models/Client');
const CoachModel = require('../../models/Coach');
const jwt = require('jsonwebtoken');

async function signUpClient(body) {
    try {
        const alias = body.alias
        const email = body.email
        const password = body.password
        const user = await ClientModel.create({alias, email, password });
        return user;
    }
    catch (e) {
        throw e;
    }
}

async function signUpCoach(body) {
    try {
        const alias = body.alias
        const email = body.email
        const password = body.password
        const user = await CoachModel.create({alias, email, password });
        return user;
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    signUpClient,
    signUpCoach,
};