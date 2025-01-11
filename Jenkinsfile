pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Load Environment Variables') {
            steps {
                script {
                    def envFile = readFile('.env')
                    def envVars = envFile.split('\n').collectEntries {
                        def pair = it.split('=')
                        [(pair[0]): pair[1]]
                    }
                    envVars.each { k, v -> env[k] = v }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Prisma Migrate') {
            steps {
                sh 'npx prisma migrate dev'
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
