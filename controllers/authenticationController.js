const express = require("express");
// const { authenticateUser, logoutUser } = require("./authenticationController");
const app = express();
// Fonction pour l'authentification de l'utilisateur
function authenticateUser(req, res) {
    const { username, password } = req.body;
    // Vérifier les informations d'identification de l'utilisateur 
    if (username === "nouhayla mouakkal" && password === "2003") {
      res.status(200).json({ message: "Authentification réussie" });
    } else {
      res.status(401).json({ message: "Identifiants invalides" });
    }
  }
// Fonction pour la déconnexion de l'utilisateur
function logoutUser(req, res) {
  res.status(200).json({ message: "Utilisateur déconnecté" });
  }

  
// Monter le routeur d'authentification
app.post("/routes/authRouter.js", authenticateUser);
app.post("/routes/authRouter.js", logoutUser);

// Lancer le serveur
app.listen(3000, () => {
  console.log("Le serveur est en cours d'exécution sur le port 3000");
});
module.exports = { authenticateUser, logoutUser };