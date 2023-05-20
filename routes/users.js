var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getAllUsers() {
  return prisma.user.findMany();
}
function getUser(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}
function delUser(id) {
  return prisma.user.delete({
    where: { id :+id},
  });
}

function updateUser(id, utilisateur) {
  return prisma.user.update({
    where: { id : +id},
    data: utilisateur,
  });
}

function addUser(utilisateur){
  return prisma.user.create({
    data : utilisateur
  });
}
function getUserE(email){
  return prisma.user.findUnique({
    where : {email: email}
  })
}
/* GET users listing. */
router.get('/', async (req, res) => {
  const { take, skip } = req.query;
  const users = await prisma.user.findMany({ take: +take || 10, skip: +skip || 0 });
  res.json(users);
});

router.get('/:id', async (req, res)=> {
  await getUser(+req.params.id).then((user) => res.json(user));
});

router.get('/:email', async (req, res)=> {
  await getUserE(req.params.email).then((user) => res.json(user));
});
// POST
router.post('/', async (req, res)=> {
  const user = await addUser(req.body);
  res.json(user);
});
//PATCH
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    try {
        const user = await updateUser(id,updatedUser)
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await delUser(id);
      res.json({ message: `User with id ${id} deleted.` });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;