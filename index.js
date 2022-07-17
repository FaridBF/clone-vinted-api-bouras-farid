const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const usersRoutes = require('./routes/users');
app.use(usersRoutes);
const offersRoutes = require('./routes/offers');
app.use(offersRoutes);

app.all('*', (req, res) => {
  res.status(400).json('Route introuvable');
});

app.listen(process.env.PORT, () => {
  console.log('Server has started ! 🤙');
});
