const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  try {
    // Effacer le contenu de la base de données
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Créer 10 utilisateurs avec le rôle "AUTHOR"
    const authors = [];
    for (let i = 0; i < 10; i++) {
      const user = await prisma.user.create({
        data: {
          nom: faker.person.fullName(), // Rowan Nikolaus
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: 'AUTHOR',
        },
      });
      authors.push(user);
    }

    // Créer 1 utilisateur avec le rôle "ADMIN"
    const admin = await prisma.user.create({
      data: {
        nom: "nouhayla",
        email: "nouhayla@gmail.com",
        password:"2003",
        role: 'ADMIN',
      },
    });

    // Créer 10 catégories
    const categories = await Promise.all(
      new Array(10).fill(null).map(async () => {
        return prisma.category.create({
          data: {
            nom: faker.lorem.word(),
          },
        });
      })
    );
    // Créer 100 articles
    for (let i = 0; i < 100; i++) {
    const categoryId = categories.slice(0, Math.floor(Math.random() * 10 + 1)).map((c) => c.id);
    const author = authors[Math.floor(Math.random() * authors.length)].id;
      const article = await prisma.article.create({
        data: {
          title: faker.lorem.sentence(),
          contenu: faker.lorem.paragraph(),
          image: faker.image.url(),
          createdAt : faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: new Date()}),
          published: faker.datatype.boolean(),
          categories: {
            connect: categoryId.map((id) => ({ id })),
          },         
          author: { connect: { id: author } },
        },
      });

      // Créer de 0 à 20 commentaires pour chaque article
      const numComments = Math.floor(Math.random() * 21);
      for (let j = 0; j < numComments; j++) {
        const user = authors[Math.floor(Math.random() * authors.length)];
        await prisma.comment.create({
          data: {
            email: faker.internet.email(),
            contenu: faker.lorem.paragraph(),
            article: { connect: { id: article.id } },
            author: { connect: { id: user.id } },
          },
        });
      }
    }

    console.log('Les données ont été créées avec succès.');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
// .catch((error) => {
//   console.error(error);
//   process.exit(1);
// })
// .finally(async () => {
//   await prisma.$disconnect();
// });