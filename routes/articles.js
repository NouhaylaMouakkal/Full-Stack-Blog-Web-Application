const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

//_____________________________ Functions _______________________________
function getArticleById(id){
    return prisma.article.findUnique({
        where :{id:+id}
    })
}
function getCommentCount(id){
    return prisma.comment.count({
        where : {articleId : +id}
    })
}
function addArticle(newArticle){
return prisma.article.create({
    data : newArticle
})
}
function updateArticle(id,upArticle){
    return prisma.article.update({
        where :{id:+id},
        data :upArticle
    })
}
function deleteArticle(id){
    return prisma.article.delete({
        where : {id:+id}
    })
}
//_____________________________ GET _______________________________
router.get('/', async (req, res) => {
    const { take, skip } = req.query;
    const articles = await prisma.article.findMany({ take: +take || 10, skip: +skip || 0 });
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
router.get('/:id/comments/count', async (req, res) => {
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
  const newArticle = req.body;
  const user = await getArticleById(newArticle.userId);
  if (!user) {
      return res.status(400).json({ error: `No user found with id ${newArticle.userId}` });
  }
  try {
      const article = await addArticle(newArticle);
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
        const article = await updateArticle(id,updatedArticle);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//_____________________________ DELETE _______________________________
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteArticle(id);
        res.json({ message: `Article with id ${id} deleted.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;