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
        // stage('Quality Gate') {
        //     steps {
        //         timeout(time: 5, unit: 'MINUTES') {
        //             script {
        //                 def qualityGate = waitForQualityGate()

        //                 echo "SonarQube Quality Gate Status: ${qualityGate.status}"

        //                 if (qualityGate.status != 'OK') {
        //                     error "Quality Gate failed. Status: ${qualityGate.status}"
        //                 }
        //             }
        //         }
        //     }
        // }
        stage('Docker build') {
            steps {
               sh "docker build -t devops-dashboard-backend:${BUILD_NUMBER} ./backend"
               sh "docker build -t devops-dashboard-frontend:${BUILD_NUMBER} ./frontend"
            }
        }
        stage('Trivy Image Scan') {
            steps {
               sh "trivy image --severity HIGH,CRITICAL devops-dashboard-backend:${BUILD_NUMBER}"
               sh "trivy image --severity HIGH,CRITICAL devops-dashboard-frontend:${BUILD_NUMBER}"
    }
}
    }

    post {
        always {
            deleteDir()
        }
    }
}