pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Test') {
            steps {
                sh 'currentBuild.rawBuild.getCause() > aa.txt'
                sh 'env > env.txt'
                sh 'previousBuild > asd.txt'
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
