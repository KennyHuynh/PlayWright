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
                echo 'whoami'
                echo "workspace directory is ${env.WORKSPACE}"
                echo "Current directory is: ${pwd()}"
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
                echo 'Completed npm install'
            }
        }
        stage('Run Tests') {
            steps {
                println 'Starting test execution'
                sh 'npx playwright test --reporter=junit' // Use JUnit reporter for Jenkins
            }
        }
    }
    post {
        always {
            // Publish JUnit test results
            junit 'test-results/junit-report.xml'
            // Archive the HTML report folder for viewing in Jenkins
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo 'Tests failed! Check the report for details.'
        }
    }
}
