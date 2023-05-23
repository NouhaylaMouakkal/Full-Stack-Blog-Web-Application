const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
function getmyArticleById(id){
    return prisma.article.findMany({where : {userId:+id}})
}
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const article = await getmyArticleById(id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports= router;