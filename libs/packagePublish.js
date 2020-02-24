'use strict'

const path = require('path')
const writeFile = require('fs').writeFileSync
const getNpmArgs = require('../utils/get-npm-args')

const pathJoin = path.join

const packagePublish = function () {
  const testMode = true

  // NOTE: don't run on dev installation (running `npm install` in this repo)
  if (!testMode) {
    const npmArgs = getNpmArgs()

    if (!npmArgs || !npmArgs.some(arg => /^timi-tools(@\d+\.\d+.\d+)?$/.test(arg))) {
      return
    }
  }

  // NOTE: <projectDir>/node_modules/antd-tools/lib
  // const projectDir = pathJoin(__dirname, '../../../')
  const projectDir = pathJoin(__dirname, '../')

  const cfg = require(path.join(projectDir, 'packages.json'))
  if (!cfg) {
    process.exit(1)
  } else {
    if (cfg.scripts) {
      delete cfg.scripts
    }

    if (cfg.devDependencies) {
      delete cfg.devDependencies
    }

    writeFile(pathJoin(projectDir, './dist/packages.json'), JSON.stringify(cfg, null, 2))
  }
}

module.exports = () => {
  let argumentsss = process.argv.splice(2)
  console.log('所传递的参数是：', argumentsss)
  packagePublish()
}


