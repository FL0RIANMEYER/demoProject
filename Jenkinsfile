pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                httpRequest contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{"serviceName":"test:test.system.prepare","start":${new Date().getTime()}}""", url: "http://localhost:8022/"
                sh 'npm install'
                sh 'npm run build'
                httpRequest contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{"serviceName":"test:test.system.prepare","end":${new Date().getTime()}}""", url: "http://localhost:8022/"
            }
        }
        // stage('Setup') {
        //     steps {
        //         httpRequest contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{"serviceName":"test:test.system","start":${new Date().getTime()}}""", url: "http://localhost:8022/"
        //         ws("${JENKINS_HOME}/workspace/Database") {
        //             dir('webServer') {
        //                 sh "npm run start:test"
        //             }
        //         }
        //         ws("${JENKINS_HOME}/workspace/DbAdapter") {
        //             dir('webServer') {
        //                 sh "npm run start:test"
        //             }
        //         }
        //         ws("${JENKINS_HOME}/workspace/WebServer") {
        //             dir('webServer') {
        //                 sh "npm run start:test"
        //             }
        //         }
        //         httpRequest contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{"serviceName":"test:test.system","end":${new Date().getTime()}}""", url: "http://localhost:8022/"
        //     }
        // }
        stage('Test') {
            steps {
                httpRequest contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{"serviceName":"test:test.system.test","start":${new Date().getTime()}}""", url: "http://localhost:8022/"
                sh 'npm run test:test:system'
                httpRequest contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{"serviceName":"test:test.system.test","end":${new Date().getTime()}}""", url: "http://localhost:8022/"
            }
        }
        // stage('Teardown') {
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
        // }
    }
}
