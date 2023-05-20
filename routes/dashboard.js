const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const AllArticles = await prisma.article.count();
      const AllComments = await prisma.comment.count();
      const AllUsers = await prisma.user.count();
      const AllCategories = await prisma.category.count();
      res.json({ AllArticles, AllComments, AllCategories, AllUsers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;