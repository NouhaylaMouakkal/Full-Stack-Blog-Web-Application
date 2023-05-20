const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
//_____________________________ Functions _______________________________
function getCommentById(id){
    return prisma.comment.findUnique({
        where : {id:+id}
    })
}
function addComment(commentaire){
    return prisma.comment.create({
        data : {
            email:commentaire.email,
            contenu:commentaire.contenu,
            articleId: commentaire.articleId,
            userId : commentaire.userId
        }
    })
}
function updateComment(id,commentaire){
    return prisma.comment.update({
        where : {id:+id},
        data : {
            email:commentaire.email,
            contenu:commentaire.contenu,
            articleId: commentaire.articleId,
            userId : commentaire.userId
        }
    })
}
function deleteComment(id){
    return prisma.comment.delete({
        where : {id:+id}
    })
}
//_____________________________ GET _______________________________
router.get('/', async (req, res) => {
    const { take, skip } = req.query;
    const commentaires = await prisma.comment.findMany({ take: +take || 10, skip: +skip || 0 });
    res.json(commentaires);
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const commentaire = await getCommentById(id);
        if (!commentaire) return res.status(404).json({ error: 'Comment not found' });
        res.json(commentaire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//_____________________________ POST _______________________________
router.post('/', async (req, res) => {
    const newCommentaire = req.body;
    try {
        const commentaire = await addComment(newCommentaire);
        res.json(commentaire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//_____________________________ PATCH _______________________________
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCommentaire = req.body;

    try {
        const commentaire = await updateComment(id,updatedCommentaire)
        res.json(commentaire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//_____________________________ DELETE _______________________________
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteComment(id);
        res.json({ message: `Commentaire with id ${id} deleted.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;