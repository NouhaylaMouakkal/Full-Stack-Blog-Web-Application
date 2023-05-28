# Projet-Web II-BDCC1

## Prérequis
Avant de pouvoir utiliser ce projet, veuillez effectuer les étapes suivantes :

1. Créez la structure de base du projet en exécutant la commande suivante :
   ```
   express --no-view
   ```

2. Installez `nodemon` de manière globale afin de ne pas avoir à relancer le serveur à chaque modification :
   ```
   npm i -g nodemon
   ```

3. Installez les modules nécessaires pour travailler avec Node.js :
   ```
   npm i
   ```

4. Installez Prisma et le client Prisma :
   ```
   npm i -D prisma
   npm i @prisma/client
   npx prisma init
   ```

5. Démarrez Apache et MySQL en lançant XAMPP.

6. Effectuez la migration initiale de la base de données avec Prisma :
   ```
   npx prisma migrate dev --name init
   ```

7. Si vous souhaitez tester avec des données existantes, exécutez la commande suivante pour générer des données de test :
   ```
   cd ./routes/seeds
   npm install faker
   node seed.js
   ```

8. Pour l'authentification, installez `jsonwebtoken` et `dotenv` :
   ```
   npm install jsonwebtoken
   npm install dotenv
   ```

## Utilisation
Une fois toutes les étapes précédentes effectuées, vous pouvez maintenant lancer l'application en exécutant la commande suivante :
```
nodemon app.js
```

Assurez-vous que le serveur est correctement lancé et accédez à l'application via votre navigateur.

N'hésitez pas à contribuer et à améliorer ce projet en créant des pull requests. Nous sommes ouverts à toutes les suggestions et aux retours d'expérience !

**Bon développement !**
