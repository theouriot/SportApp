const router = require("express").Router();
const stepController = require("../controllers/StepController");

router.post("/", async function (req, res, next) {
    try {
        const step = await stepController.createStep(req.query.id,req.body);
        res.status(201).json({step});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/all", async function (req, res, next) {
    try {
        const step = await stepController.getAllSteps();
        res.status(200).json(step)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/byProgram", async function (req, res, next) {
    try {
        const id = req.query.id;
        const steps = await stepController.getStepsByProgram(id);
        if (!steps) {
            return res.status(204).json({message: "No step with this id"});
        }
        res.status(200).json(steps)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const step = await stepController.getStepById(id);
        if (!step) {
            return res.status(204).json({message: "No step with this id"});
        }
        res.status(200).json(step)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const step = await stepController.deleteStep(id);
        if (!step) {
            return res.status(204).json({message: "No step with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const step = await stepController.updateStep(id,req.body);
        if (!step) {
            return res.status(204).json({message: "No step with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
