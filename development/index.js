const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

app.use('/api/blogs', blogsRouter);
app.use(cors());
app.use(express.json());

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
