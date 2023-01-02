const express = require('express');
const router = express.Router();
tasksController = require('../controllers/tasks-controller');

router.post("/", tasksController.addTask);

module.exports = router;