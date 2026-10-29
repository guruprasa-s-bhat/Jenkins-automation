pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend'){
                    sh 'npm ci'
                    sh 'npm test'
                }   
            }
        }

        stage('Frontend Test') {
            steps {
                dir('frontend'){
                    sh 'npm ci'
                    sh 'npm test'
                }  
            }
        }

        stage('Trivy Filesystem Scan'){
            steps {
                sh 'trivy fs --severity HIGH,CRITICAL .'
            }
        }

        stage('Sonarqube analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}