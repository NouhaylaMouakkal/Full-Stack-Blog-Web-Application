const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
function getArticleComments(id){
    return prisma.comment.findMany({where : {articleId:+id}})
}
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const article = await getArticleComments(id);
        if (!article) return res.status(404).json({ error: 'Comments not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports= router;