const express = require('express');
const app = express();
const { addSchool, listSchools } = require('./controllers/schoolController');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Routes
app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);

// Use Render's assigned port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
