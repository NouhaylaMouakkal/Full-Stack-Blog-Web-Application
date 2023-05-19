const { PrismaClient } = require('@prisma/client')
const {faker} = require('@faker-js/faker')
const prisma = new PrismaClient()

async function main() {
  // Effacer le contenu de la base de données
  await prisma.comment.deleteMany()
  await prisma.article.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Créer 10 utilisateurs avec le rôle "AUTHOR"
  const authors = []
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        nom: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'AUTHOR',
      },
    })
    authors.push(user)
  }

  // Créer 1 utilisateur avec le rôle "ADMIN"
  const admin = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'ADMIN',
    },
  })

  // Créer 10 catégories
  const categories = []
  for (let i = 0; i < 10; i++) {
    const category = await prisma.category.create({
      data: {
        nom: faker.lorem.word(),
      },
    })
    categories.push(category)
  }

  // Créer 100 articles
  for (let i = 0; i < 100; i++) {
    const author = authors[Math.floor(Math.random() * authors.length)]
    const article = await prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        contenu: faker.lorem.paragraph(),
        image: faker.random.arrayElement([null, faker.image.image()]),
        createdAt: new Date(),
        published: faker.random.boolean(),
        categories: { connect: categories.slice(0, Math.floor(Math.random() * 4) + 1).map(c => ({ nom: c.nom })) },
        author: { connect: { id: author.id } },
      },
    })

    // Créer de 0 à 20 commentaires pour chaque article
    const numComments = Math.floor(Math.random() * 21)
    for (let j = 0; j < numComments; j++) {
      const user = authors[Math.floor(Math.random() * authors.length)]
      await prisma.comment.create({
        data: {
          email: faker.internet.email(),
          contenu: faker.lorem.paragraph(),
          article: { connect: { id: article.id } },
          author: { connect: { id: user.id } },
        },
      })
    }
  }

  console.log('Les données ont été créées avec succès.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })