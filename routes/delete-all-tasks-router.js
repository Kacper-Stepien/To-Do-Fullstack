const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks-controller');

router.post("/", tasksController.deleteAllTasks);

module.exports = router;