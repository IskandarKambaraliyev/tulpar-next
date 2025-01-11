pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Use the name you configured in Manage Jenkins > Global Tool Configuration
    }

    environment {
        PATH = "$PATH:/usr/local/bin" // Add the Node.js binary path to the environment
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
