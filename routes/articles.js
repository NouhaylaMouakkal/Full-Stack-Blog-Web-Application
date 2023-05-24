const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

//_____________________________ Functions _______________________________
function getArticleById(id){
    return prisma.article.findUnique({where : {id:+id}})
}
function getCommentCount(id){
    return prisma.comment.count({
        where : {articleId : +id}
    })
}
//_____________________________ GET _______________________________
router.get('/', async (req, res) => {
    const { take, skip } = req.query;
    const articles = await prisma.article.findMany({ take: +take || 100, skip: +skip || 0 });
    res.json(articles);
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const article = await getArticleById(id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//récupérer le nombre de commentaires associés à un article
router.get('/:id/commentaires/count', async (req, res) => {
    const { id } = req.params;
    try {
      const count = await getCommentCount(id);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//_____________________________ POST _______________________________
router.post('/', async (req, res) => {
  const article_data = req.body;
  const { categories } = article_data;

  try {
    const user = await prisma.user.findUnique({ where: { id: +article_data.userId } });

    if (!user) {
      return res.status(400).json({ error: `No user found with id ${article_data.userId}` });
    }

    const createdAt = new Date(article_data.createdAt);
    const updatedAt = new Date(article_data.updatedAt);

    const article = await prisma.article.create({
      data: {
        title: article_data.title,
        contenu: article_data.contenu,
        image: article_data.image,
        createdAt: createdAt,
        updatedAt: updatedAt,
        published: article_data.published,
        categories: {
          connect: categories.map(id => ({ id })),
        },
        userId: article_data.userId
      },
    });

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//_____________________________ PATCH _______________________________
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedArticle = req.body;

  try {
      const article = await prisma.article.update({
          where: { id: +id },
          data: updatedArticle,
      });
      res.json(article);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});




//_____________________________ DELETE _______________________________
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Delete related records first
      await prisma.comment.deleteMany({ where: { articleId: +id } });
  
      // Delete the article
      await prisma.article.delete({ where: { id: +id } });
  
      res.json({ message: `Article with id ${id} deleted.` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;