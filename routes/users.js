var express = require('express');
var router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

function getAllUsers(){
  return prisma.user.findMany()
}

function getUser(id){
  return prisma.user.findUnique({
      where : {id}
  })
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  getAllUsers().then(users=>res.json(users))
});

router.get('/:id', function(req, res, next) {
  getUser(+req.params.id).then(user=>res.json(user))
});

module.exports = router;
