const express = require('express');
const router = express.Router();

// Récupérer take catégories à partir de la position skip
router.get('/', (req, res) => {
  const { take=0 , skip=0 } = req.query;
  res.send(`Liste des articles (take=${take}, skip=${skip})`);
});

// Récupérer une catégorie ayant l'id donné
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Catégorie avec l'id ${id}`);
});

// Ajouter une nouvelle catégorie envoyée sous format JSON
router.post('/', (req, res) => {
  const nouvelleCategorie = req.body;
  res.send(`Catégorie ajoutée avec succès`);
});

// Mettre à jour la catégorie envoyée dans le corps de la requête
router.patch('/', (req, res) => {
  const categorieModifiee = req.body;
  res.send(`Catégorie modifiée avec succès`);
});

// Supprimer la catégorie ayant l'id donné
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Catégorie avec l'id ${id} supprimée avec succès`);
});

module.exports = router;
