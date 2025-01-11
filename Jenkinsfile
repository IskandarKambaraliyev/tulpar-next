pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        PRISMA_CLIENT_ENGINE_TYPE = "binary"
        DEBUG = "prisma:*"
        DATABASE_URL = "postgres://neondb_owner:BM5fAdnPgI1z@ep-curly-shape-a2bm3k1x-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug PATH') {
            steps {
                sh 'echo $PATH'
                sh 'docker --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Prisma Migrate') {
            steps {
                retry(3) { // Retry up to 3 times
                    sh 'npx prisma migrate deploy'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t tulpar-next .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
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
