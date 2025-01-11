pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        DATABASE_URL = "postgres://neondb_owner:BM5fAdnPgI1z@ep-curly-shape-a2bm3k1x-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug Environment') {
            steps {
                sh 'echo $PATH'
                sh 'node --version'
                sh 'npm --version'
                sh 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build --build-arg DATABASE_URL=$DATABASE_URL -t tulpar-next .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
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
