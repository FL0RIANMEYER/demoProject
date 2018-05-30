pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Test') {
            steps {
                println(env)
                sh 'ls webServer'
                echo 'Hello World ...EndToEnd'
            }
        }
    }
}
