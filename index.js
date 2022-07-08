//gestion des variables d'environnements
const dotenv = require('dotenv');
dotenv.config();

//import du fichier cors
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

//gestion des erreurs CORS
const app = express();
app.use(cors());
app.use(express.json());

//connexion à la bdd
mongoose.connect(process.env.MONGODB_URI);

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
