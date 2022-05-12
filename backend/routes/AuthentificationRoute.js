const router = require("express").Router();
const authentificationController = require("../controllers/Users/AuthentificationController");

router.post("/client/signup", async function (req, res, next) {
    try {
        const user = await authentificationController.signUpClient(req.body);
        if(!user){
            return res.status(204).json({message: "No client with this id"});
        }
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.post("/coach/signup", async function (req, res, next) {
    try {
        const user = await authentificationController.signUpCoach(req.body);
        if(!user){
            return res.status(204).json({message: "No coach with this id"});
        }
        res.status(201).json( user);
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.post("/login", async function (req, res, next) {
    try {
        const client = await authentificationController.loginClient(req.body);
        if(!client){
            const coach = await authentificationController.loginCoach(req.body);
            if(!coach){
                return res.status(204).json({message: "No client or coach with this id"});
            }
            res.status(201).json(coach);
        }
        res.status(201).json( client);
    } catch (e) {
        res.status(400).json({ message: "can't load data" });
    }
});


module.exports = router;

