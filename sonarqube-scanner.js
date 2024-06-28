/* eslint-disable no-undef */
const scanner = require('sonarqube-scanner')

scanner(
  {
    serverUrl: 'http://localhost:9003',
    projectKey: 'welfare-bo',
    token: 'sqa_6891820909af31e4d0999a120a30ba0a64f0e992',
    options: {
      'sonar.exclusions': '**/*.test.js,**/*.test.jsx',
      'sonar.tests': './src',
      'sonar.test.inclusions': '**/*.test.js,**/*.test.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.sources': './src'
    }
  },
  () => process.exit()
)
