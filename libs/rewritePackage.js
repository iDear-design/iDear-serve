'use strict'
const path = require('path')
const writeFile = require('fs').writeFileSync
const pathJoin = path.join

module.exports = (api, options) => {
  api.registerCommand('rewritePackage', {
    description: 'start development server',
    usage: 'timi-serve serve [options] [entry]',
    options: {
      '--outdir': `specify output directory (default: dist)`
    }
  }, async function rewritePackage(args) {
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
      writeFile(pathJoin(projectDir, `./${args.outdir}/packages.json`), JSON.stringify(cfg, null, 2))
    }
  })
}

module.exports.defaultModes = {
  rewritePackage: 'rewritePackage'
}
