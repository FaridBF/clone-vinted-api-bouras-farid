const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const Offer = require('../models/Offer');
const User = require('../models/User');

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString('base64')}`;
};

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const user = await User.findOne({
      token: req.headers.authorization.replace('Bearer ', '')
    });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: 'Token présent mais non valide !' });
    }
  } else {
    res.status(401).json({ error: 'Token non envoyé !' });
  }
};

router.post(
  '/offer/publish',
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.files);
      const newOffer = new Offer({
        product_name: req.body.title,
        product_description: req.body.description,
        product_price: req.body.price,
        product_details: [
          { MARQUE: req.body.brand },
          { TAILLE: req.body.size },
          { ETAT: req.body.condition },
          { COULEUR: req.body.color },
          { EMPLACEMENT: req.body.city }
        ],
        owner: req.user
      });

      const result = await cloudinary.uploader.upload(
        convertToBase64(req.files.picture),
        {
          folder: 'vinted/offers',
          public_id: `${req.body.title} - ${newOffer._id}`
        }
      );
      newOffer.product_image = result;

      await newOffer.save();

      res.json(newOffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/offers', async (req, res) => {
  const filtersObject = {};

  if (req.query.title) {
    filtersObject.product_name = new RegExp(req.query.title, 'i');
  }

  if (req.query.priceMin) {
    filtersObject.product_price = { $gte: req.query.priceMin };
  }

  if (req.query.priceMax) {
    // ?
    if (filtersObject.product_price) {
      filtersObject.product_price.$lte = req.query.priceMax;
    } else {
      filtersObject.product_price = { $lte: req.query.priceMax };
    }
  }

  const sortObject = {};
  if (req.query.sort === 'price-desc') {
    sortObject.product_price = 'desc';
  } else if (req.query.sort === 'price-asc') {
    sortObject.product_price = 'asc';
  }

  let limit = 3;
  if (req.query.limit) {
    limit = req.query.limit;
  }

  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }

  const offers = await Offer.find(filtersObject)
    .sort(sortObject)
    .select('product_name product_price')
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Offer.countDocuments(filtersObject);

  res.json({ count: count, offers: offers });
});

router.get('/offer/:id', async (req, res) => {
  console.log(req.params);
  try {
    const offer = await Offer.findById(req.params.id).populate({
      path: 'owner',
      select: 'account.username email'
    });
    res.json(offer);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
