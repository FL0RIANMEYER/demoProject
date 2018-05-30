pipeline {
    agent {
        node {
            label 'my-defined-label'
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
