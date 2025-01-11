pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        PATH = "$PATH:/usr/local/bin"
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
                    def envFile = readFile '.env'
                    def envVars = envFile.split('\n').collectEntries { line ->
                        def pair = line.tokenize('=')
                        if (pair.size() == 2) {
                            [(pair[0].trim()): pair[1].trim()]
                        } else {
                            error("Invalid line in .env file: ${line}")
                        }
                    }
                    envVars.each { key, value ->
                        env[key] = value
                    }
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
