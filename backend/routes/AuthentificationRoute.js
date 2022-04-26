const router = require("express").Router();
const authentificationController = require("../controllers/Users/AuthentificationController");

router.post("/", async function (req, res, next) {
    try {
        const user = await authentificationController.signUp(req.body);
        res.status(201).json({ user: user._id});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

module.exports = router;

