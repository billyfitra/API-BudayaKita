// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Routes
const seniRoutes = require('./routes/seniRoutes');
app.use('/api/seni', seniRoutes);

// Mulai server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
