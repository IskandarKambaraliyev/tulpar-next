pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Use NodeJS tool configured in Jenkins
    }

    environment {
        PRISMA_CLIENT_ENGINE_TYPE = "binary"
        DEBUG = "prisma:*"
        DATABASE_URL = "postgres://neondb_owner:BM5fAdnPgI1z@ep-curly-shape-a2bm3k1x-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Fetch the latest code from the GitHub repository
            }
        }

        stage('Debug Environment') {
            steps {
                // Debugging environment to verify correct versions of Node.js and Docker
                sh 'echo $PATH'
                sh 'node --version'
                sh 'npm --version'
                sh 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile
                sh 'docker build -t tulpar-next .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                // Stop and remove any existing container, then deploy a new one
                sh 'docker stop tulpar-next-container || true'
                sh 'docker rm tulpar-next-container || true'
                sh 'docker run -d -p 3000:3000 --name tulpar-next-container tulpar-next'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
