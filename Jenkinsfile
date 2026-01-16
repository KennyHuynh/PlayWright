pipeline {
    agent {
        label 'linux-agent' // Use an agent with Node.js and Playwright dependencies
    }
    parameters {
        choice(name: 'RUN_ON', choices: ['WSL', 'Docker'], description: 'Machine to run tests on')
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
                    echo "workspace directory is ${env.WORKSPACE}"
                    echo "Current directory is: ${pwd()}"
                    if (params.RUN_ON == 'WSL') {
                        echo 'Running on WSL environment'
                        sh 'npm ci'
                        sh 'npx playwright install webkit'
                        sh 'npx playwright install --with-deps' // Install Playwright browsers with dependencies
                    } else {
                        echo 'Running on Docker environment'
                            // Build the Docker image with a tag
                        sh 'docker build -t playwright-test:latest -f DockerFile .'
                }
            }
                echo 'Completed npm install'
        }
    }
        stage('Run Tests') {
            steps {
                script {
                    if (params.RUN_ON == 'Docker') {
                        echo 'Executing tests inside Docker container'
                        sh 'docker run --rm playwright-tests:latest'
                    } else {
                        echo 'Executing tests on WSL environment'
                        sh 'npx playwright test'
                    }
                }
            }
        }
}
    post {
        always {
            // Archive the HTML report folder for viewing in Jenkins
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo 'Tests failed! Check the report for details.'
        }
    }
}
