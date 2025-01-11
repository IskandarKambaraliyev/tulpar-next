pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Use the NodeJS version configured in Jenkins
    }

    environment {
        PRISMA_CLIENT_ENGINE_TYPE = "binary"
        DEBUG = "prisma:*"
        DATABASE_URL = "postgres://neondb_owner:BM5fAdnPgI1z@ep-curly-shape-a2bm3k1x-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"
        PATH = "/bin:/usr/bin:/usr/local/bin:$PATH" // Ensure sh and docker commands are available
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Pulls the latest code from GitHub
            }
        }

        stage('Debug PATH') {
            steps {
                // Debugging step to verify PATH and check for essential commands
                sh 'echo $PATH'
                sh 'which sh'
                sh 'which docker'
                sh 'docker --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Prisma Migrate') {
            steps {
                retry(3) { // Retry up to 3 times in case of timeout
                    sh 'npx prisma migrate deploy'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh 'docker build -t tulpar-next .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                // Deploy the Docker container
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
