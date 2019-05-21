const express = require('express');
const WorkoutLogModel = require('../data/models/workout-log-model');
const workoutLogRouter = express.Router();

workoutLogRouter
    .post('/create', (req, res) => {
        const { name, exercises } = req.body;

        const mappedExercises = exercises.map(exercise => {
            return Object.assign({}, exercise, {
                reps: Number(exercise.reps),
                sets: Number(exercise.reps),
            });
        });

        const newWorkoutLog = new WorkoutLogModel({
            name,
            date: new Date(),
            exercises: mappedExercises,
        });
    
        newWorkoutLog.save(() => {
            res.redirect('/');
        });
    })
    .get('/all', (req, res) => {
        const query = WorkoutLogModel.find({});

        query.limit(20);

        query.exec((err, results) => {
            if (err) {
                throw err;
            }

            res.render('workout-logs', { logs: results })
        });
    })  
    .get('/create', (req, res) => {
        res.redirect('/');
    })
    .get('/:logId', (req, res) => {
       const { logId } = req.params;
       const query = WorkoutLogModel.findById(logId);

       query.exec((err, log) => {
          if (err) {
             throw err;
          }
 
          res.render('workout-log', log);
       });
    });

module.exports = workoutLogRouter;