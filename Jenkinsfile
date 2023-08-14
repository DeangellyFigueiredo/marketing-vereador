pipeline {
  agent any
  tools {nodejs "node14"}

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    VERSION = "${env.GIT_COMMIT}"
    BRANCH = "${env.GIT_BRANCH}"
    ENV = "${params.STAGING_DEPLOY_ENV == "production" ? "production" : "staging"}"
  }
 
  stages {
    stage("Prepare Jenkins environment") {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }

    stage("NPM Install") {
      steps {
        sh "npm install --force"
      }
    }

    stage("NPM Build") {
      steps {
        sh "npm run build"
      }
    }

    stage("Build service image") {
      parallel {
        stage("Production") {
          steps {
            sh "docker build -t labtecs/pe-diabetico-api:${GIT_COMMIT} ."
          }
        }
      }
    }

    stage("Send image to repository") {
      parallel {
        stage("Production") {
          steps {
            sh "docker push labtecs/pe-diabetico-api:${GIT_COMMIT}"
          }
        }
      }
    }

    stage("Deploy") {
      parallel {
        stage("Production") {
          steps {
            sh "TAG='${GIT_COMMIT}' docker-compose up -d"
          }
        }
      }
    }
  }

  post {
    always {
      sh 'docker logout'
    }
  }
}
