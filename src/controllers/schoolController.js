const School = require('../models/schoolModel');
const { calculateDistance } = require('../utils/distanceCalculator');

// Add School
exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newSchool = await School.create({ name, address, latitude, longitude });
        res.status(201).json({ message: 'School added successfully.', schoolId: newSchool.id });
    } catch (error) {
        res.status(500).json({ message: 'Error adding school.', error: error.message });
    }
};

// List Schools
exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'User latitude and longitude are required.' });
    }

    try {
        const schools = await School.findAll();
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(
                latitude, longitude, school.latitude, school.longitude
            );
            return { ...school.toJSON(), distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json({ schools: sortedSchools });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schools.', error: error.message });
    }
};
