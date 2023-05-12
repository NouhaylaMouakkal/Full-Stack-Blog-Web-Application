var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const articlesRouter = require('./routes/articles.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Utilisation de body-parser pour parser les requêtes HTTP avec des corps en JSON
app.use(bodyParser.json());

// Utilisation du router articlesRouter pour les routes relatives aux articles
app.use('/articles', articlesRouter);

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});

// Route pour les pages non trouvées
app.use((req, res, next) => {
  const error = new Error('Page non trouvée');
  error.status = 404;
  next(error);
});

// Gestion des erreurs
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message || 'Erreur interne du serveur'
    }
  });
});

module.exports = app;
