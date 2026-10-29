pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Backend Test'){
            sh 'npm ci'
            sh 'npm test'
        }
    }
}