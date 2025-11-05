pipeline {
    // Sur quel agent le pipeline s'exécute
    agent { label 'docker' } // l'agent que tu as configuré
    tools {
            nodejs 'node25'  // <-- le nom que tu as donné dans Jenkins Tools
    }
    //  Variables globales
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials') // tes creds Docker Hub
        IMAGE_NAME = "abdoulaye/nodejs-api"
    }

    //  Stages : les étapes du pipeline
    stages {

        // stage('Checkout') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
        //             sh 'git clone https://$GITHUB_USER:$GITHUB_TOKEN@github.com/abdoulayely-7/todoListJenkins.git'
        //         }
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                // Installer les packages Node.js
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Lancer les tests
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Créer l'image Docker
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                // Login Docker et push
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Déployer l'application sur l'agent
                sh './deploy.sh'
            }
        }
        
    }
    post {
        success {
            echo "✅ Déploiement terminé avec succès !"
        }
        failure {
            echo "❌ Une erreur est survenue pendant le pipeline."
        }
    }
}
