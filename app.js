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
// const authRouter = require('./routes/authRouter')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/commentaires', commentairesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/auth',authRouter);
// ***********************************************************

// In your Node.js backend
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Perform the verification and database lookup using Prisma ORM
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || user.password !== password) {
    // User not found or password doesn't match
    res.status(401).json({ error: "Invalid credentials" });
  } else {
    // User found and password matches
    res.json({ message: "Login successful" });
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
