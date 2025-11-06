pipeline {
    agent { label 'docker' }

    environment {
        DOCKERHUB_REPO = 'abdoulayely777/todolist'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Node Build & Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                }
            }
            steps {
                sh 'npm install'
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
