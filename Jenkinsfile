pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Test') {
            steps {
                def upstream = currentBuild.rawBuild.getCause(hudson.model.Cause$UpstreamCause)
                sh 'env > env.txt'
                sh 'previousBuild > asd.txt'
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
