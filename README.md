# [Vinted](https://www.vinted.fr/)

## **API - [Vinted](https://www.vinted.fr/) - Projet-Back-end - [Nodejs](https://nodejs.org/en/)**

<br>Exercice réalisé dans le cadre du [Bootcamp "Le Reacteur"](https://www.lereacteur.io/)</br>

**Les outils utilisés** :

- [Node.js](https://nodejs.org/en/) permet de créer des applications rapides et évolutives côté serveur et en réseau.
- [Postman](https://www.postman.com/) sert à exécuter des appels HTTP directement depuis une interface graphique, de sorte à nous permettre d'intérargir avec notre API.
- [Cloudinary](https://cloudinary.com/) ce qui nous permettra d'héberger nos fichiers sur les serveurs Amazon [AWS S3](https://docs.aws.amazon.com/fr_fr/AmazonS3/latest/userguide/Welcome.html).
- [MongoDB](https://www.mongodb.com/fr-fr) est une base de données NoSQL orientée documents.
- [MongoDB Atlas](https://www.mongodb.com/fr-fr/atlas/database) permet de déployer une base de données multicloud.
- [MongoDBCompass](https://www.mongodb.com/fr-fr/products/compass) est l'interface utisateur graphique de MongoDB.
- [Mongoose](https://mongoosejs.com/) est une bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js
- [GitHub](https://github.com/) héberge nos différents projets de code source dans une variété de langages de programmation et garde une trace des différentes modifications apportées à chaque itération.
- [Heroku](https://www.heroku.com/) sert au déploiement sur le cloud de notre projet.
- Le package [uid2](https://github.com/coreh/uid2) permet de générer des chaînes de caractères aléatoirement en fonction d'une longueur donnée.
- Le package [crypto-js](https://www.npmjs.com/package/crypto-js) est une librairie d'algorithmes cryptographiques.

**Objectifs** :

- Création de mes différentes routes (users, offers)
- Gestion de l'authentification avec Postman via le Bearer Token
- Comment envoyer un fichier avec Postman
- Convertir un buffer en base64
- Création d'une fonction de conversion
- Manipuler des algorithmes de hash, tels que le MD5 ou le SHA256
- Configuration de Cloudinary
- Prise en main de l'outil Cloudinary

**Fonctionnalités souhaitées:**

- Possibilité de se connecter et de s'inscrire sur la plateforme
- Poster une annonce
- L'ensemble des requêtes doivent être sécurisées
- Les données sensibles doivent être cryptées (mot de passe etc...)
- Lister le contenu d'un dossier sur Cloudinary
- Envoyer un ou plusieurs fichiers sur Cloudinary
- Supprimer une image sur Cloudinary
- Supprimer un dossier sur Cloudinary
- Supprimer plusieurs images en une seule fois
- Supprimer un dossier (vide)

**Les différentes routes:**

### /user/signup (POST)

<span style="color:green">Création d'un nouvel utilisateur
</span>

**Body** : `email` , `password` , `username` , `phone`
<br>

### /user/login (POST)

<span style="color:green">Connexion d'un utilisateur
</span>

**Body** : `email` , `password`
<br>

### /offers/ (GET)

<span style="color:green">Récupération de la liste des annonces
</span>

**Body** : `title` , `priceMin`, `priceMax`, `sort`, `page`, `limit`

### /offer/:id (GET)

<span style="color:green">Récupération de l'annonce via l'ID
</span>

**Param**: `id`

### /offer/publish (POST)

<span style="color:green">Poster une nouvelle annonce
</span>

**Body** : `title` , `description`, `price`, `brand`, `size`, `condition`, `description`, `color`, `city`, `picture`
