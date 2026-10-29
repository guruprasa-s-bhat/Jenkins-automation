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
    }
}