# Dockerfile
FROM node:20-alpine

# Crée le dossier de l'app
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Expose le port sur lequel l'application tourne
EXPOSE 3000

# Commande pour démarrer l'app
CMD ["npm", "start"]
