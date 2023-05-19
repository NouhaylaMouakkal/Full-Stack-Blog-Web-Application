const express = require("express");
const authRouter = express.Router();
const {
  authenticateUser,
  logoutUser,
} = require("../controllers/authenticationController");

// Route pour l'authentification d'un utilisateur
authRouter.post("/login", authenticateUser);

// Route pour la déconnexion d'un utilisateur
authRouter.post("/logout", logoutUser);

module.exports = authRouter;