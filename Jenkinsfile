pipeline {
    agent { label 'docker' }

    environment {
        DOCKERHUB_REPO = 'abdoulayely777/todolist'
    }

    stages {

        stage('Node Build & Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                }
            }
            steps {
                script {
                    echo "📦 Installation des dépendances..."
                    sh 'npm install'

                    echo "🧪 Exécution des tests unitaires..."
                    def result = sh(script: 'npm test', returnStatus: true)

                    if (result == 0) {
                        echo " Tous les tests ont réussi !"
                    } else if (result == 1) {
                        error(" Certains tests ont échoué. Vérifie le rapport de tests.")
                    } else {
                        error(" Aucun test trouvé ou erreur inconnue (code ${result}).")
                    }
                }
            }
        }

        stage('Build Docker image') {
            steps {
                sh ''' 
                    export DOCKER_BUILDKIT=1
                    docker build -t $DOCKERHUB_REPO:latest .
                    '''
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

        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'RENDER_HOOK_URL')]) {
                    sh '''
                        curl -X POST $RENDER_HOOK_URL
                    '''
                }
            }
        }


    }

    post {
        success { echo '✅ Build and push and deploy succeeded!' }
        failure { echo '❌ Build failed.' }
    }
}
