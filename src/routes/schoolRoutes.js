const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController.js');

// Routes
router.post('/api/addSchool', addSchool);
router.get('/api/listSchools', listSchools);

module.exports = router;
