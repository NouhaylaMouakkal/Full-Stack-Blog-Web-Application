const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
//_____________________________ Functions _______________________________
function getCategoryById(id){
    return prisma.category.findUnique({
        where : {id:+id}
    })
}
function getCountOfArticlesByCategory(id) {
    return prisma.article.count({
      where: {
        categories: {
          some: {
            id: +id,
          },
        },
      },
    });
  }
function addCategory(categorie){
    return prisma.category.create({
        data :{
            nom : categorie.nom
        }
    })
}
function updateCategory(id,categorie){
    return prisma.category.update({
        where : {id:+id},
        data :{
            nom : categorie.nom
        }
    })
}
function deleteCategory(id){
    return prisma.category.delete({
        where : {id: +id}
    })
}
//_____________________________ GET _______________________________
router.get('/', async (req, res) => {
    const { take, skip } = req.query;
    const articles = await prisma.category.findMany({ take: +take || 10, skip: +skip || 0 });
    res.json(articles);
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categorie = await getCategoryById(id);
        if (!categorie) return res.status(404).json({ error: 'Category not found' });

        res.json(categorie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id/articles', async (req, res) => {
    const { id } = req.params;
    const { take, skip } = req.query;
    try {
        const articles = await prisma.article.findMany({
            where: {
                categories: {
                    some: {id: +id,},
                }, },
            take: +take || 10,
            skip: +skip || 0,
        });

        const count = await prisma.article.count({
            where: {
                categories: {
                    some: {id: +id,},
                },},
        });

        if (!articles) return res.status(404).json({ error: 'No articles found for this category !!' });
        res.json({ articles, count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id/articles/count', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await getCountOfArticlesByCategory(id)
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//_____________________________ POST _______________________________
router.post('/', async (req, res) => {
  const newCategorie = req.body;
  try {
      const categorie = await addCategory(newCategorie);
      res.json(categorie);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
//_____________________________ PATCH _______________________________
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCategorie = req.body;
    try {
        const categorie = await updateCategory(id,updatedCategorie)
        res.json(categorie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//_____________________________ DELETE _______________________________
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCategory(id);
        res.json({ message: `Categorie with id ${id} deleted.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;