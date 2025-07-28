const goalsModel = require("../models/Goal");

// =============== Controller For Creating/post a new Goal ===============

const AddNewGoal = async (req, res) => {
  try {
    const { title, description, progress } = req.body;

    const goal = await goalsModel.create({ title, description, progress });

    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===========CONTROLLER TO GET ALL EXISTING GOALS THAT HAS BEEN CREATED ====================

const getallGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find();

    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ======= CONTROLLER TO GEAT A SINGLE GOAL BY ID ==============

const getEachGoal = async (req, res) => {
  try {
    const goal = await goalsModel.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==============CONTROLLER TO GET ALL ONGOING GOALS ======== (progress < 100%)

const ongoingGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find({ progress: { $lt: 100 } });

    console.log("Ongoing goals retrieved", goals);

    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ========= CONTROLLER TO GET ALL COMPLETED GOALS === ( progress === 100%)

const completedGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find({ progress: 100 });

    console.log("Completed goals retrieved", goals);

    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// CONTROLLER TO UPDATE/PATCH PROGRESS BY ID========

const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    // Ensure progress is provided
    if (progress === undefined) {
      return res.status(400).json({ error: "progress value is required" });
    }

    const progressUpadate = await goalsModel.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true }
    );

    //  if the goal doesnot exist, return a 404 error
    if (!progressUpadate) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(progressUpadate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ============= controller for delleting goal by id

const deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await goalsModel.findByIdAndDelete(req.params.id);

    if (!deletedGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  AddNewGoal,
  getallGoals,
  getEachGoal,
  ongoingGoals,
  completedGoals,
  updateProgress,
  deleteGoal,
};
