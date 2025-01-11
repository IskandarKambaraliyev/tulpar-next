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

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker build -t tulpar-next .
                docker run -d -p 3000:3000 tulpar-next
                '''
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
