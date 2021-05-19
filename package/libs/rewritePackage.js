'use strict'
const {pathJoin} = require('../utils/pathAddress')
const {pathsIsExist, writeFile, mkdirFolder} = require('../utils/fileSystem')

module.exports = (api, options) => {
  api.registerCommand('rewritePackage', {
    description: 'rewrite this project package',
    usage: 'idear-packge serve [options] [entry]',
    options: {
      '--outdir': `specify output directory (default: dist)`
    }
  }, async function rewritePackage(args) {
    const outdir = args.outdir || 'dist'
    const outdirDir = pathJoin(outdir)
    const hasOutdir = pathsIsExist(outdirDir)
    if (!hasOutdir) {
      mkdirFolder(outdirDir)
    }
    const packagDir = pathJoin('package.json')
    const hasPackage = pathsIsExist(packagDir)
    if (!hasPackage) {
      process.exit(1)
    } else {
      const packagData = require(packagDir)
      if (packagData.scripts) {
        delete packagData.scripts
      }
      if (packagData.devDependencies) {
        delete packagData.devDependencies
      }
      writeFile(pathJoin(`./${outdir}/package.json`), packagData)
    }
  })
}

module.exports.defaultModes = {
  rewritePackage: 'rewritePackage'
}
