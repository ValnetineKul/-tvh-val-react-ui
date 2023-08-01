@Library(['ci-library', 'common-utils']) _
import com.tvh.build.meta.Source
import com.tvh.build.meta.Image
import com.tvh.build.meta.SemVer

Source application
Image dockerImage

pipeline {
  options {
    disableConcurrentBuilds(abortPrevious: false)
    timeout(time: 60, unit: 'MINUTES')
  }
  agent { label 'node-dind' }
  stages {
    stage('Initialization') {
      steps { 
        initBase()
        script { application = checkoutSource() } 
      }
    }

    stage('Pull dependencies') {
      steps { sh 'yarn ci:install' }
    }

    stage('Build') {
      parallel {
        stage('TS build') {
          steps { sh 'yarn ci:build' }
        }

        stage('Storybook build') {
          steps { sh 'yarn ci:storybook' }
        }
      }
    }

    stage('Lint') {
      steps { sh 'yarn ci:lint' }
    }

    stage('Test') {
      steps { sh 'yarn ci:test' }
    }

    stage('SonarQube') {
      steps {
        withEnv([
          "BUILD_TAG=${env.BUILD_TAG}",
          "BRANCH_NAME=${env.BRANCH_NAME}",
          "SONAR_LOGIN=c77d556a20ef5fb8156eae7db91a083c53749b3b"
        ]) {
          sh 'yarn ci:sonar'
        }
      }
    }

    stage('Publish') {
      when { branch 'master' }
      steps {
        script {
          Map nexusCreds = secret.userpass('nexus/tech-user')
          withEnv([
            'CI=1',
            'GITLAB_TOKEN=eMrw_Qwmc-BC4E5E6s9s',
            'NPM_CONFIG_REGISTRY=https://nexus.tools.parts.tvh.com/repository/npm-releases/',
            "NPM_USERNAME=${nexusCreds.username}",
            "NPM_PASSWORD=${nexusCreds.password}",
            'NPM_EMAIL=kaloyan.arsov+jenkins@tvh.com'
          ]) {
            sh 'yarn ci:publish'
          }
        }
      }
    }

    stage('Storybook image build') {
      when { branch 'master' }
      steps {
        script { 
          releaseVersion = sh(returnStdout: true, script: "npx -c 'echo \"\$npm_package_version\"'").trim()
          dockerImage = versionImage(application, new SemVer(releaseVersion, '')) 
          if (!dockerImage.exists) {
            createImage.docker(dockerImage)
          }
        } 
      }
    }

    stage('Storybook deploy') {
      when { branch 'master' }
      steps { triggerDeploy(application, dockerImage) }
    }

    stage('Storybook deploy (PROD)') {
      when { branch 'master' }
      steps { triggerDeploy(application, dockerImage, 'internal-prod') }
    }
  }

}