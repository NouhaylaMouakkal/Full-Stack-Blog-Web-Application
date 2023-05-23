var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function getUserE(email){
  return prisma.user.findUnique({
    where : {email: email}
  })
}
router.get('/:email', async (req, res)=> {
    await getUserE(req.params.email).then((user) => res.json(user));
  });
module.exports = router;