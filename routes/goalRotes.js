const express = require("express");
const {
  AddNewGoal,
  getallGoals,
  getEachGoal,
  ongoingGoals,
  completedGoals,
  updateProgress,
  deleteGoal,
} = require("../controller/goalController");

const router = express.Router();

// create a route for addNewGoal
router.post("/", AddNewGoal);

// create a route for getallGoals
router.get("/all", getallGoals);

// create a route for ongoingGoals
router.get("/ongoing", ongoingGoals);

// create a route for completedGoals
router.get("/completed", completedGoals);

// Create a route for  getEachGoal..... anytime you are getting with id it should be dynamic
router.get("/:id", getEachGoal);

// create a route for updateProgress
router.patch("/:id/progress", updateProgress);

// create a route for deleteGoal
router.delete("/:id/delete", deleteGoal);

module.exports = router;
