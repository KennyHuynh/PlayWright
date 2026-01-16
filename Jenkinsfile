pipeline {
    agent {
        label 'linux-agent' // Use an agent with Node.js and Playwright dependencies
    }
    tools {
        nodejs 'Node16' // Matches the name configured in Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Checks out code from your source control management
                echo 'Completed checkout code from SCM'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    def user = sh(script: 'whoami', returnStdout: true).trim()
                    echo "The current user is: ${user}"
                }
                echo "workspace directory is ${env.WORKSPACE}"
                echo "Current directory is: ${pwd()}"
                sh 'npm ci'
                sh 'npx playwright install webkit'
                sh 'npx playwright install --with-deps' // Install Playwright browsers with dependencies
                echo 'Completed npm install'
            }
        }
        stage('Run Tests') {
            steps {
                println 'Starting test execution'
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
            // Archive the HTML report folder for viewing in Jenkins
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
        failure {
            echo 'Tests failed! Check the report for details.'
        }
    }
}
