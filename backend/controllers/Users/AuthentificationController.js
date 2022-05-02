const ClientModel = require('../../models/Client');
const CoachModel = require('../../models/Coach');
const jwt = require('jsonwebtoken');

const age = 60 * 60 * 24 * 1000 * 100; // correspond to 100 days
const createToken = (id) => {
    try {
        return jwt.sign({id}, process.env.TOKEN_KEY, {
            expiresIn: age
        })
    }catch (e) {
        console.log(e);
    }
};


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

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id})
    } catch (err){
        res.status(200).json({ errors });
    }
}


module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    signUpClient,
    signUpCoach,
};