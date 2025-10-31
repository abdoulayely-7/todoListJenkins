#!/bin/bash
echo "Déploiement de l'application Node.js"

# Supprimer l'ancien conteneur si existant
docker stop nodejs-api || true
docker rm nodejs-api || true

# Lancer le nouveau conteneur
docker run -d -p 3000:3000 --name nodejs-api abdoulaye/nodejs-api:latest
