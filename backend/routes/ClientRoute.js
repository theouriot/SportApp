const router = require("express").Router();
const clientController = require("../controllers/Users/ClientController");

router.get("/all", async function (req, res, next) {
    try {
        console.log("a")
        const client = await clientController.getAllClients();
        res.status(200).json(client)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.get("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const client = await clientController.getClientById(id);
        if (!client) {
            return res.status(204).json({message: "No client with this id"});
        }
        res.status(200).json(client)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.delete("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const client = await clientController.deleteClient(id);
        if (!client) {
            return res.status(204).json({message: "No client with this id"});
        }
        res.status(200).json({ message: "Delete done"})
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

router.put("/", async function (req, res, next) {
    try {
        const id = req.query.id;
        const client = await clientController.updateClient(id,req.body);
        if (!client) {
            return res.status(204).json({message: "No client with this id"});
        }
        const clientToReturn = await clientController.getClientById(id);
        res.status(200).json(clientToReturn)
    } catch (e) {
        res.status(500).json({ message: "Can't load data" });
    }
});

module.exports = router;
