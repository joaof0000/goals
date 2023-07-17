const express = require("express");
const router = express.Router();
//creating this controller module
const goalsCtrl = require("../controllers/goals");

//Get /goals
router.get("/", goalsCtrl.home);

//GET /newgoals/new
router.get("/new", goalsCtrl.new);

// Get Allapoinment page
router.get("/newgoals", goalsCtrl.newgoals);

// GET /goals/:id (show functionality) MUST be below new route
router.get("/:id", goalsCtrl.show);

//POST /goals
router.post("/", goalsCtrl.create);

module.exports = router;
