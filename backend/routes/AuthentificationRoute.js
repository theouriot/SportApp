const router = require("express").Router();
const authentificationController = require("../controllers/Users/AuthentificationController");

router.post("/client", async function (req, res, next) {
    try {
        const user = await authentificationController.signUpClient(req.body);
        res.status(201).json({ user: user._id});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.post("/coach", async function (req, res, next) {
    try {
        const user = await authentificationController.signUpCoach(req.body);
        res.status(201).json({ user: user._id});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

module.exports = router;

