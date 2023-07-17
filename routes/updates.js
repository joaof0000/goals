const express = require("express");
const router = express.Router();

const updatesCtrl = require("../controllers/updates");

router.post("/goals/:id/updates", updatesCtrl.create);

router.put("/updates/:id", updatesCtrl.update);

router.delete("/updates/:id", updatesCtrl.delete);

module.exports = router;
