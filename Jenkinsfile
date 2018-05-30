pipeline {
    agent {
        node {
            customWorkspace '/some/other/path'
        }
    }
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
