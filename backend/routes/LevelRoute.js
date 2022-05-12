const router = require("express").Router();
const programCatController = require("../controllers/LevelController");

router.post("/", async function (req, res, next) {
    try {
        const programCat = await programCatController.createLevel(req.body);
        res.status(201).json({programCat});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/all", async function (req, res, next) {
    try {
        const programCat = await programCatController.getAllLevels();
        res.status(200).json(programCat)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const programCat = await programCatController.getLevelById(id);
        if (!programCat) {
            return res.status(204).json({message: "No level with this id"});
        }
        res.status(200).json(programCat)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const programCat = await programCatController.deleteLevel(id);
        if (!programCat) {
            return res.status(204).json({message: "No level with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const programCat = await programCatController.updateLevel(id,req.body);
        if (!programCat) {
            return res.status(204).json({message: "No level with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
