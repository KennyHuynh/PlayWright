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
                println 'Completed checkout stage'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                        try {
                        wsl sh 'npm ci'
                        wsl sh 'npx playwright install --with-deps'
                        echo 'Completed npm install'
                } catch (err) {
                        echo "Command failed with error: ${err}"
                        }
                }
            }
        }
        stage('Run Tests') {
            steps {
                println 'Starting test execution'
                wsl sh 'npx playwright test --reporter=junit' // Use JUnit reporter for Jenkins
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
