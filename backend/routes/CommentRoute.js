const router = require("express").Router();
const programCatController = require("../controllers/CommentController");

router.post("/", async function (req, res, next) {
    try {
        const comment = await programCatController.createComment(req.query.id,req.body);
        res.status(201).json({comment});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/all", async function (req, res, next) {
    try {
        const comment = await programCatController.getAllComments();
        res.status(200).json(comment)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const comment = await programCatController.getCommentById(id);
        if (!comment) {
            return res.status(204).json({message: "No comment with this id"});
        }
        res.status(200).json(comment)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.get("/byArticle", async function (req, res, next) {
    try {
        const id = req.query.id;
        const comment = await programCatController.getCommentsByArticle(id);
        if (!comment) {
            return res.status(204).json({message: "No comment with this id"});
        }
        res.status(200).json(comment)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const comment = await programCatController.deleteComment(id);
        if (!comment) {
            return res.status(204).json({message: "No comment with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const comment = await programCatController.updateComment(id,req.body);
        if (!comment) {
            return res.status(204).json({message: "No comment with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
