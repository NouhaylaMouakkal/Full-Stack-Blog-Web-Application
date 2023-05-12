const express = require('express');
const router = express.Router();

// Récupérer take commentaires à partir de la position skip
router.get('/', (req, res) => {
  const { take = 10, skip = 0 } = req.query;
  // ... logique pour récupérer les commentaires dans la base de données ...
  res.send('Liste des commentaires');
});

// Récupérer une commentaire ayant l'id donné
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // ... logique pour récupérer la commentaire avec l'id donné dans la base de données ...
  res.send(`commentaire avec l'id ${id}`);
});

// Ajouter une nouvelle commentaire envoyée sous format JSON
router.post('/', (req, res) => {
  const nouvelleCategorie = req.body;
  // ... logique pour ajouter la nouvelle commentaire dans la base de données ...
  res.send(`commentaire ajoutée avec succès`);
});

// Mettre à jour la commentaire envoyée dans le corps de la requête
router.patch('/', (req, res) => {
  const categorieModifiee = req.body;
  // ... logique pour mettre à jour la commentaire dans la base de données ...
  res.send(`commentaire modifiée avec succès`);
});

// Supprimer la commentaire ayant l'id donné
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // ... logique pour supprimer la commentaire avec l'id donné dans la base de données ...
  res.send(`commentaire avec l'id ${id} supprimée avec succès`);
});

module.exports = router;
