const router = require("express").Router();
const coachController = require("../controllers/Users/CoachController");

router.get("/all", async function (req, res, next) {
    try {
        const coaches = await coachController.getAllCoaches();
        res.status(200).json(coaches)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const alias = req.query.alias;
        const coach = await coachController.getCoachByAlias(alias);
        if (!coach) {
            return res.status(204).json({message: "No coach with this id"});
        }
        res.status(200).json(coach)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const coach = await coachController.deleteCoach(id);
        if (!coach) {
            return res.status(204).json({message: "No coach with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const coach = await coachController.updateCoach(id,req.body);
        if (!coach) {
            return res.status(204).json({message: "No coach with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
