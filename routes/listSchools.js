const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).send({ message: 'Latitude and longitude are required.' });
    }

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error fetching schools.' });
        }

        const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRad = (deg) => (deg * Math.PI) / 180;
            const R = 6371; // Earth's radius in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) ** 2 +
                      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
            return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        };

        const sortedSchools = results.map((school) => ({
            ...school,
            distance: calculateDistance(userLocation.latitude, userLocation.longitude, school.latitude, school.longitude),
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).send(sortedSchools);
    });
});

module.exports = router;
