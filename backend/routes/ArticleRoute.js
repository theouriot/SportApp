const router = require("express").Router();
const articleController = require("../controllers/ArticleController");

router.post("/", async function (req, res, next) {
    try {
        const article = await articleController.createArticle(req.body);
        res.status(201).json({article});
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});
router.get("/all", async function (req, res, next) {
    try {
        const article = await articleController.getAllArticles();
        res.status(200).json(article)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const alias = req.query.alias;
        const article = await articleController.getArticleById(alias);
        if (!article) {
            return res.status(204).json({message: "No article with this id"});
        }
        res.status(200).json(article)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const article = await articleController.deleteArticle(id);
        if (!article) {
            return res.status(204).json({message: "No article with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const article = await articleController.updateArticle(id,req.body);
        if (!article) {
            return res.status(204).json({message: "No article with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
