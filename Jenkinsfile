pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Test') {
            steps {
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
