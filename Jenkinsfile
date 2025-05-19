pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "my-app"  // Nazwa obrazu Docker
        DOCKER_REGISTRY = "my-docker-registry"  // Adres rejestru Docker
        DOCKER_TAG = "latest"  // Tag obrazu
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout kodu z repozytorium
                git 'https://github.com/your-repo/my-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Instalacja zależności
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Uruchomienie testów
                    sh 'npm test'
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    // Budowanie aplikacji
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Budowanie obrazu Docker
                    sh "docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Publish Docker Image') {
            steps {
                script {
                    // Zalogowanie do rejestru Docker (z wykorzystaniem zmiennych środowiskowych)
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin ${DOCKER_REGISTRY}"
                    }
                    
                    // Publikowanie obrazu do rejestru Docker
                    sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo 'Build and publish Docker image succeeded!'
        }
        failure {
            echo 'Build or publish Docker image failed.'
        }
    }
}
