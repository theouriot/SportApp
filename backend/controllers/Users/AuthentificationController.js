const ClientModel = require('../../models/Client');
const CoachModel = require('../../models/Coach');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

async function signUpClient(body) {
    try {
        const {alias , email, password}  = body
        console.log(alias + " - " + email + " - " + password)
        /* We search if the email already exists */
        const clientEmail = await ClientModel.findOne({email})
        const coachEmail = await CoachModel.findOne({email})
        if(clientEmail || coachEmail){
            res.status(400)
            throw new Error('Email already exist')
        }

        /* We search if the alias already exists */
        const clientAlias = await ClientModel.findOne({alias})
        const coachAlias = await CoachModel.findOne({alias})
        if(clientAlias || coachAlias){
            res.status(400)
            throw new Error('Alias already exist')
        }

        /* Hashing password */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        /* Creating the user */
        const user = await ClientModel.create({alias, email, password: hashedPassword });
        console.log("b")
        return user;
    }
    catch (e) {
        throw e;
    }
}

async function signUpCoach(body) {
    try {
        const {alias , email, password}  = body

        /* We search if the email already exists */
        const clientEmail = await ClientModel.findOne({email})
        const coachEmail = await CoachModel.findOne({email})
        if(clientEmail || coachEmail){
            res.status(400)
            throw new Error('Email already exist')
        }

        /* We search if the alias already exists */
        const clientAlias = await ClientModel.findOne({alias})
        const coachAlias = await CoachModel.findOne({alias})
        if(clientAlias || coachAlias){
            res.status(400)
            throw new Error('Alias already exist')
        }

        /* Hashing password */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        /* Creating the user */
        const user = await CoachModel.create({alias, email, password: hashedPassword });
        return user;
    }
    catch (e) {
        throw e;
    }
}

async function loginClient(body) {
    const { alias, email, password } = body

    // Check for user email
    const clientMail = await ClientModel.findOne({ email })
    const clientAlias = await ClientModel.findOne({ alias })

    if (clientMail  && (await bcrypt.compare(password, clientMail.password))) {
        return ({
            _id: clientMail._id,
            alias: clientMail.alias,
            email: clientMail.email,
            token: tokenGeneration(clientMail._id),
            role: "client"
        })
    } else if(clientAlias  && (await bcrypt.compare(password, clientAlias.password))){
        return ({
            _id: clientAlias._id,
            alias: clientAlias.alias,
            email: clientAlias.email,
            token: tokenGeneration(clientAlias._id),
            role: "client",
        })
    } else {
        return false;
    }
}

async function loginCoach(body) {
    const { alias, email, password } = body

    // Check for user email

    const coachMail = await CoachModel.findOne({ email })
    const coachAlias = await CoachModel.findOne({ alias })
    if (coachMail  && (await bcrypt.compare(password, coachMail.password))) {
        return ({
            _id: coachMail._id,
            alias: coachMail.alias,
            email: coachMail.email,
            token: tokenGeneration(coachMail._id),
            role: "coach"
        })
    } else if(coachAlias  && (await bcrypt.compare(password, coachAlias.password))){
        return ({
            _id: coachAlias._id,
            alias: coachAlias.alias,
            email: coachAlias.email,
            token: tokenGeneration(coachAlias._id),
            role: "coach"
        })
    } else {
        return false;
    }
}


/* Generate JWT */
const tokenGeneration = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: '1d',
    })
}

module.exports = {
    signUpClient,
    signUpCoach,
    loginClient,
    loginCoach
};