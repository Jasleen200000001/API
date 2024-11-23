const School = require('../models/schoolModel');

// Add a school
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const school = await School.create({ name, address, latitude, longitude });
    return res.status(201).json({ message: 'School added', school });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List all schools
const listSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    return res.status(200).json({ schools });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addSchool, listSchools };
