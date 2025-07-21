const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

mongoose.connect(process.env.MONGO_URI, () => console.log('MongoDB connected'));

app.listen(5000, () => console.log('Server running on port 5000'));