const db = require("../models");

module.exports = (app) => {
  // GET all workout data when hitting workouts page
  app.get("/api/workout", (req, res) => {
    db.workout.find()
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error == ", err);
      });
  });

  // POST route for when workout is 'completed'
  app.post("/api/workout/", (req, res) => {
    db.Workout.create(req.body)
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error == ", err);
      });
  });

  // PUT route to add/update workout for current workout
  app.put("/api/workout/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { workout: req.body } }
    )
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error == ", err);
      });
  });

  // GET all workout data 
  app.get("/api/workout/range", (req, res) => {
    let currentDate = new Date().toISOString();
    let previousWeek = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    db.Workout.find({
      day: {
        $gt: previousWeek,
        $lte: currentDate,
      },
    })
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error ==", err);
      });
  });
};