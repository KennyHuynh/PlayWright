pipeline {
    agent any
    tools {
        nodejs 'Node16' // Matches the name configured in Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                //checkout scm // Checks out code from your source control management
                //testing
                git branch: 'master', url: 'https://github.com/KennyHuynh/PlayWright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                // Install Playwright's required browsers and dependencies
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
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