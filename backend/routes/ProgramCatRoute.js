const router = require("express").Router();
const programCatController = require("../controllers/ProgramCatController");

router.post("/", async function (req, res, next) {
    try {
        const programCat = await programCatController.createProgramCat(req.body);
        res.status(201).json({programCat});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/all", async function (req, res, next) {
    try {
        const programCat = await programCatController.getAllProgramCats();
        res.status(200).json(programCat)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const programCat = await programCatController.getProgramCatById(id);
        if (!programCat) {
            return res.status(204).json({message: "No program category with this id"});
        }
        res.status(200).json(programCat)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const programCat = await programCatController.deleteProgramCat(id);
        if (!programCat) {
            return res.status(204).json({message: "No program category with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const programCat = await programCatController.updateProgramCat(id,req.body);
        if (!programCat) {
            return res.status(204).json({message: "No program category with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
