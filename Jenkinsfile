pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Test') {
            steps {
                sh 'env > env.txt' 
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
