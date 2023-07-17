const GoalModel = require("../models/goal");

module.exports = {
  show,
  new: newNewgoal,
  create,
  home,
  newgoals,
};

async function home(req, res) {
  try {
    const goals = await GoalModel.find({});

    res.render("index");
  } catch (err) {
    console.log(err);
    res.render(err);
  }
}

async function newgoals(req, res) {
  try {
    const goals = await GoalModel.find({});
    console.log("Newgoal got called");
    res.render("goals/newgoals", { title: "All goals", goals: goals });
  } catch (err) {
    console.log(err);
    res.render(err);
  }
}

async function show(req, res) {
  const goal = await GoalModel.findById(req.params.id);

  res.render("goals/show", { title: "Goal List Details", goal });
}

function newNewgoal(req, res) {
  res.render("goals/new", { title: "Add New Goal", errorMsg: "" });
}

async function create(req, res) {
  req.body.CorrectInformation = !!req.body.CorrectInformation;

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    const goalFromTheDatabase = await GoalModel.create(req.body);

    res.redirect(`goals/${goalFromTheDatabase._id}`);
  } catch (err) {
    console.log(err);
    res.render("goals/new", { errorMsg: err.message });
  }
}
