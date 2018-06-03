pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Setup') {
            steps {
                sh 'npm install'
                sh 'npm run build'

                // ws("${JENKINS_HOME}/workspace/Database") {
                //     dir('webServer') {
                //         sh "npm run start:test"
                //     }
                // }
                // ws("${JENKINS_HOME}/workspace/DbAdapter") {
                //     dir('webServer') {
                //         sh "npm run start:test"
                //     }
                // }
                // ws("${JENKINS_HOME}/workspace/WebServer") {
                //     dir('webServer') {
                //         sh "npm run start:test"
                //     }
                // }
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test:test:system'
            }
        }
        stage('Teardown') {
            // steps {
            //     ws("${JENKINS_HOME}/workspace/Database") {
            //         dir('webServer') {
            //             sh "npm run stop:test"
            //         }
            //     }
            //     ws("${JENKINS_HOME}/workspace/DbAdapter") {
            //         dir('webServer') {
            //             sh "npm run stop:test"
            //         }
            //     }
            //     ws("${JENKINS_HOME}/workspace/WebServer") {
            //         dir('webServer') {
            //             sh "npm run stop:test"
            //         }
            //     }
            // }
        }
    }
}
