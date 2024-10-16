# Utilise l'image Node.js
FROM node:14

# Crée un répertoire de travail
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Commande pour démarrer l'application
CMD ["npm", "start"]
