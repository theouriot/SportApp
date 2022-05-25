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
        const articles = await articleController.getAllArticles();
        res.status(200).json(articles)
    } catch (e) {
        res.status(500).json({ message: "can't load data" });
    }
});

router.get("/byCoach", async function (req, res, next) {
    try {
        const id = req.query.id;
        const article = await articleController.getAllArticlesByCoach(id);
        if (!article) {
            return res.status(204).json({message: "No article with this id"});
        }
        res.status(200).json(article)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const article = await articleController.getArticleById(id);
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

router.put("/addView", async function (req, res, next) {
    try {
        const id = req.query.id;
        const article = await articleController.addView(id);
        if (!article) {
            return res.status(204).json({message: "No article with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/addLike", async function (req, res, next) {
    try {
        const id = req.query.id;
        const article = await articleController.addLike(id);
        if (!article) {
            return res.status(204).json({message: "No article with this id"});
        }
        res.status(200).json({ message: "Update done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
