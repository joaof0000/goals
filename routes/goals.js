const router = require('express').Router();
router.get('/', goalsCtrl.index)

module.exports = router;
// Require the controller that exports To-Do CRUD functions
const goalsCtrl = require('../controllers/goals');

// All actual paths begin with "/todos"

// GET /todos
router.get('/', goalsCtrl.index);
