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

        // stage('Sonarqube analysis') {
        //     steps {
        //         script {
        //             def scannerHome = tool 'SonarScanner'

        //             withSonarQubeEnv() {
        //                 sh "${scannerHome}/bin/sonar-scanner"
        //             }
        //         }
        //     }
        // }
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

        
       stage('Docker Hub Push') {
    when {
        branch 'main'
    }

    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-cred',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
            )
        ]) {
            sh '''
                echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                docker tag devops-dashboard-backend:${BUILD_NUMBER} \
                    $DOCKER_USERNAME/devops-dashboard-backend:${BUILD_NUMBER}

                docker tag devops-dashboard-frontend:${BUILD_NUMBER} \
                    $DOCKER_USERNAME/devops-dashboard-frontend:${BUILD_NUMBER}

                docker push $DOCKER_USERNAME/devops-dashboard-backend:${BUILD_NUMBER}
                docker push $DOCKER_USERNAME/devops-dashboard-frontend:${BUILD_NUMBER}

                docker logout
            '''
        }
    }
    stage('Deploy') {
    when {
        branch 'main'
    }

    steps {
        sh '''
            docker compose down || true
            docker compose up -d
        '''
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