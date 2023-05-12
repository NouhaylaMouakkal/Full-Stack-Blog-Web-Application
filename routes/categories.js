const express = require('express');
const router = express.Router();

// Récupérer take catégories à partir de la position skip
router.get('/', (req, res) => {
  const { take = 10, skip = 0 } = req.query;
  // ... logique pour récupérer les catégories dans la base de données ...
  res.send('Liste des catégories');
});

// Récupérer une catégorie ayant l'id donné
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // ... logique pour récupérer la catégorie avec l'id donné dans la base de données ...
  res.send(`Catégorie avec l'id ${id}`);
});

// Ajouter une nouvelle catégorie envoyée sous format JSON
router.post('/', (req, res) => {
  const nouvelleCategorie = req.body;
  // ... logique pour ajouter la nouvelle catégorie dans la base de données ...
  res.send(`Catégorie ajoutée avec succès`);
});

// Mettre à jour la catégorie envoyée dans le corps de la requête
router.patch('/', (req, res) => {
  const categorieModifiee = req.body;
  // ... logique pour mettre à jour la catégorie dans la base de données ...
  res.send(`Catégorie modifiée avec succès`);
});

// Supprimer la catégorie ayant l'id donné
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // ... logique pour supprimer la catégorie avec l'id donné dans la base de données ...
  res.send(`Catégorie avec l'id ${id} supprimée avec succès`);
});

module.exports = router;
