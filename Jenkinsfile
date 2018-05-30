pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    def upstream = currentBuild.rawBuild.getCause(hudson.model.Cause$UpstreamCause)
    stages {
        stage('Test') {
            steps {
                sh 'env > env.txt'
                sh 'previousBuild > asd.txt'
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
