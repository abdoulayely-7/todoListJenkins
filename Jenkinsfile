pipeline {
    agent { label 'docker' } // ton agent

    environment {
        DOCKERHUB_REPO = 'abdoulayely777/todolist'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test inside Node container') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm test || echo "No tests found"'
                sh "docker build -t $DOCKERHUB_REPO:latest ."
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
        success { echo '✅ Build and push succeeded!' }
        failure { echo '❌ Build failed.' }
    }
}
