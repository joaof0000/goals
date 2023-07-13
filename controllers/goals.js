// controllers/goals.js
const Goal = require('../models/goal');
function index(req, res) {
    res.render('goals/index', {
      goals: Goal.getAll()
    });
  }

   // controllers/goals.js

 module.exports = {
    index
  };
  
  function index(req, res) {
    res.render('goals/index', {
      goals: Goal.getAll()
    });
  }
 
   // controllers/goal.js

 // Convention is to name the model in uppercase and singular
 const Goal = require('../models/goal');

 module.exports = {
   index
 };
