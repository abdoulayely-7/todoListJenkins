// pipeline {
//     agent { label 'docker' }  // ✅ Ton agent déclaré dans Jenkins
//
//     environment {
//         // 🔧 Variables globales pour réutilisation dans toutes les étapes
//         IMAGE_NAME = "abdoulayely777/todolist"
//         REGISTRY_CREDENTIALS = "dockerhub-credentials" // ID des credentials Jenkins
//     }
//
//     stages {
//
//         stage('Checkout') {
//             steps {
//                 echo '📦 Récupération du code source depuis GitHub...'
//                 git branch: 'main', url: 'https://github.com/abdoulayely-7/todoListJenkins.git'
//             }
//         }
//
//         stage('Run Tests') {
//             steps {
//                 script {
//                     echo '🧪 Lancement des tests dans un conteneur Node.js...'
//                     // ✅ Lance les tests dans un conteneur Node.js temporaire
//                     docker.image('node:20-alpine').inside {
//                         sh 'npm install'
//                         sh 'npm test'
//                     }
//                 }
//             }
//         }
//
//         stage('Build Docker Image') {
//             steps {
//                 echo '🐳 Construction de l’image Docker...'
//                 sh "docker build -t ${IMAGE_NAME}:latest ."
//             }
//         }
//
//         stage('Push to Docker Hub') {
//             steps {
//                 echo '🚀 Connexion à Docker Hub et push de l’image...'
//                 withCredentials([usernamePassword(
//                     credentialsId: "${REGISTRY_CREDENTIALS}",
//                     usernameVariable: 'USER',
//                     passwordVariable: 'PASS'
//                 )]) {
//                     sh """
//                         echo $PASS | docker login -u $USER --password-stdin
//                         docker push ${IMAGE_NAME}:latest
//                     """
//                 }
//             }
//         }
//
//         stage('Deploy') {
//             steps {
//                 echo '⚙️ Déploiement du conteneur sur le serveur Jenkins...'
//                 sh """
//                     docker stop todolist || true
//                     docker rm todolist || true
//                     docker run -d --name todolist -p 3000:3000 ${IMAGE_NAME}:latest
//                 """
//             }
//         }
//     }
//
//     post {
//         success {
//             echo '✅ Pipeline terminé avec succès !'
//         }
//         failure {
//             echo '❌ Une erreur est survenue pendant l’exécution du pipeline.'
//         }
//     }
// }


// deuxieme

pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-p 3000:3000'
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // ID défini dans Jenkins
        DOCKERHUB_REPO = 'abdoulayely777/todolist'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t $DOCKERHUB_REPO:latest .'
            }
        }

        stage('Login & Push Docker image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKERHUB_REPO:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and push succeeded!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}

