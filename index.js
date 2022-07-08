//gestion des variables d'environnements
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

//gestion des erreurs CORS
const cors = require('cors');
app.use(cors());

//connexion à la bdd
mongoose.connect(process.env.MONGODB_ATLAS_URI);

const app = express();
app.use(express.json());

//import des routes users et offers
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
