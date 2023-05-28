const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const articlesRouter = require('./routes/articles.js');
const categoriesRouter = require('./routes/categories.js');
const commentairesRouter = require('./routes/commentaires.js');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const counting = require('./routes/dashboard.js');
const checkUser = require('./routes/checkin.js');
const myarticles = require("./routes/myarticles.js");
const articleComments = require("./routes/ArticleComments.js");
const cors = require('cors');
// const authRouter = require('./routes/authRouter')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/commentaires', commentairesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',checkUser)
app.use('/countAll',counting);
app.use('/myarticles',myarticles);
app.use('/articleComments',articleComments);
// ***********************************************************

require('dotenv').config();
const jwt = require("jsonwebtoken");
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  const secretKey = process.env.SECRET_KEY;

  if (user && user.password === password) {
    // Informations d'identification valides
    const token = jwt.sign({ email, role: "AUTHOR" }, secretKey);
    const role = user.role;
    const id =  user.id;

    res.json({ token, role , id});
  } else {
    // Informations d'identification invalides
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
});



//*************************************************************** */
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});

app.use((req, res, next) => {
  const error = new Error('Page non trouvée');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message || 'Erreur interne du serveur'
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
