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

function getUserByEmail(email){
  return prisma.user.findUnique({
    where: {email}
  })
}
function addUser(user){
  return prisma.user.create({data : user})
}
function delUser(id){
  return prisma.user.delete({
    where : {id}
  })
}
function updateUser(){
  return prisma.user.update({
    where : {id:user.id},
    data : user
  })
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  getAllUsers().then(users=>res.json(users))
});

router.get('/:id', function(req, res, next) {
  getUser(+req.params.id).then(user=>res.json(user))
});

router.get('/:email',function(req,res,next){
  getUserByEmail(req.params.email).then(user=>res.json(user))
})

// POST
router.post('/:email',function(req,res,next){
  addUser(req.body).then(user=>res.json(user))
})

router.delete('/:id',function(req,res,next){
  delUser(+req.params.id).then(user=>res.json(user))
})

router.patch('/',function(req,res,next){
  updateUser(req.body).then(user=>res.json(user))
})
module.exports = router;