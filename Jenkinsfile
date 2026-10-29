pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Test') {
            step{
                dir('backend'){
                    sh 'npm ci'
                    sh 'npm test'
                }   
            }
        }
    }
}