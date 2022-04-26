const UserModel = require('../../models/Client');
const jwt = require('jsonwebtoken');

async function signUp(body) {
    try {
        const alias = body.alias
        const email = body.email
        const password = body.password
        const user = await UserModel.create({alias, email, password });
        return user;
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    signUp,
};