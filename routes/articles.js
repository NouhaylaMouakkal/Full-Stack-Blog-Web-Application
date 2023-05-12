const express = require('express');
const router = express.Router();

// Récupérer take articles à partir de la position skip
router.get('/', (req, res) => {
  const { take , skip } = req.query;
  res.send(`Liste des articles (take=${take}, skip=${skip})`);
});

// Récupérer un article ayant l'id donné
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Article avec l'id ${id}`);
});

// Ajouter un nouveau article envoyé sous format JSON
router.post('/', (req, res) => {
  const nouvelArticle = req.body;
  res.send(`Article ajouté avec succès`);
});

// Mettre à jour l'article ayant l'id donné
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const articleModifie = req.body;
  res.send(`Article avec l'id ${id} modifié avec succès`);
});

// Supprimer l'article ayant l'id donné
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Article avec l'id ${id} supprimé avec succès`);
});

module.exports = router;
