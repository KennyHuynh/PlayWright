pipeline {
    agent {
        label 'linux-agent' // Use an agent with Node.js and Playwright dependencies
    }
    parameters {
        choice(name: 'RUN_ON', choices: ['WSL', 'Docker'], description: 'Machine to run tests on')
        string(name: 'CUSTOM_CASE_TO_RUN', defaultValue: '.', description: 'Input the specific caseID to run, e.g., tc01. Use "." to run all test cases. To run multiple test cases, separate them with | character, e.g., tc01|tc02')
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
                    def caseToRun = params.CUSTOM_CASE_TO_RUN.trim() == '' ? '.' : params.CUSTOM_CASE_TO_RUN.trim()
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'vault-lochuynh',
                            usernameVariable: 'TEST_USERNAME',
                            passwordVariable: 'TEST_PASSWORD'
                        )
                    ]) {
                        if (params.RUN_ON == 'Docker') {
                            echo 'Executing tests inside Docker container'
                            sh "docker run --rm playwright-tests:latest -g '${ caseToRun }'"
                    } else {
                            sh 'echo "Executing tests on WSL environment"'
                            sh 'echo "Username from Vault: $TEST_USERNAME"'
                            sh 'echo "Password from Vault: $TEST_PASSWORD"'
                            sh "npx playwright test -g '${ caseToRun }'"
                        }
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
