pipeline {
    agent any
    options {
        // skipDefaultCheckout()
    }

    stages {
        stage('Test') {
            steps {
                // ws("${JENKINS_HOME}/workspace/WebServer") {
                    sh 'env > env.txt'
                    sh 'ls webServer'
                    echo 'Hello World ...EndToEnd'
                // }
            }
        }
    }
}
