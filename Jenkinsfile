pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Test') {
            steps {
                echo "${env}"
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
