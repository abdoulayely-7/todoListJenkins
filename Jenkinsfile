pipeline {
    agent { label 'docker' }

    environment {
        IMAGE_NAME = "abdoulayely777/todolist"
        REGISTRY_CREDENTIALS = 'dockerhub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/abdoulayely-7/todoListJenkins.git'
            }
        }

        stage('Run Tests') {
            agent { docker { image 'node:20-alpine' } } // tests isolés
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                        echo $PASS | docker login -u $USER --password-stdin
                        docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker stop todolist || true
                    docker rm todolist || true
                    docker run -d --name todolist -p 3000:3000 ${IMAGE_NAME}:latest
                """
            }
        }
    }
}
