const router = require("express").Router();
const programController = require("../controllers/ProgramController");

router.post("/", async function (req, res, next) {
    try {
        const program = await programController.createProgram(req.body);
        res.status(201).json({program});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/all", async function (req, res, next) {
    try {
        const programs = await programController.getAllPrograms();
        res.status(200).json(programs)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const program = await programController.getProgramById(id);
        if (!program) {
            return res.status(204).json({message: "No program with this id"});
        }
        res.status(200).json(program)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const program = await programController.deleteProgram(id);
        if (!program) {
            return res.status(204).json({message: "No program with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const program = await programController.updateProgram(id,req.body);
        if (!program) {
            return res.status(204).json({message: "No program with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/addView", async function (req, res, next) {
    try {
        const id = req.query.id;
        const program = await programController.addView(id);
        if (!program) {
            return res.status(204).json({message: "No program with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/addLike", async function (req, res, next) {
    try {
        const id = req.query.id;
        const program = await programController.addLike(id);
        if (!program) {
            return res.status(204).json({message: "No program with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
