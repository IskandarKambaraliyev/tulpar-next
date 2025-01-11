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
                        if (line.trim() && !line.startsWith('#')) { // Ignore blank lines and comments
                            def index = line.indexOf('=')
                            if (index == -1) {
                                error("Invalid line in .env file: ${line}")
                            }
                            def key = line.substring(0, index).trim()
                            def value = line.substring(index + 1).trim()
                            [(key): value]
                        } else {
                            [:] // Ignore lines that are comments or blank
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
