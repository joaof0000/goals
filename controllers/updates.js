// Import our  model in order to talk to the goals collection in mongodb
const GoalModel = require("../models/goal");

module.exports = {
  create,
  delete: deleteUpdate,
  update: updateUpdate,
};

async function updateUpdate(req, res) {
  try {
    //Find the newgoal with update
    const goalDoc = await GoalModel.findOne({
      "updates._id": req.params.id,
      "updates.user": req.user._id,
    });

    //Find the update subdoc using the id method on mongoose arrays
    const updateSubdoc = goalDoc.updates.id(req.params.id);
    console.log("updateSubdoc......: ", updateSubdoc);
    console.log("req.body.Content......: ", req.body.Content);

    //update the text of the update
    updateSubdoc.Content = req.body.Content;

    //save the updated book
    goalDoc.save();

    //redirect back to the goal's show page
    res.redirect(`/goals/${goalDoc._id}`);
    // res.redirect(`/goals/`);
  } catch (err) {
    res.send(err);
  }
}

async function deleteUpdate(req, res, next) {
  try {
    //Find the newgoal with the update
    const goalDoc = await GoalModel.findOne({
      "updates._id": req.params.id,
      "updates.user": req.user._id,
    });

    //A user that is not logged in
    if (!goalDoc) return res.redirect("/goals");

    //Remove the update from the goal goal.update array
    //remove takes the id of the update
    goalDoc.updates.remove(req.params.id);
    //Muted the goalDoc updates array so we need to tell mongodb to update the database
    await goalDoc.save();

    //tells the client to make a request to this route
    res.redirect(`/goals/${goalDoc._id}`);
  } catch (err) {
    res.send(err);
  }
}

async function create(req, res) {
  // console.log(req.body);

  try {
    const goalFromTheDatabase = await GoalModel.findById(req.params.id);
    //Add the logged in user property to req,body
    req.body.user = req.user._id;
    req.body.userName = req.user.Name;
    req.body.userAvatar = req.user.avatar;

    goalFromTheDatabase.updates.push(req.body);
    // since I changed a document (goalFromTheDb) (I mutated it)
    // I have to tell mongodb that, so we have to save
    await goalFromTheDatabase.save();
    //Then respond to the client
    // console.log(goalFromTheDatabase);
    res.redirect(`/goals/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
}
