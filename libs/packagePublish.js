'use strict';

const path = require('path');
const writeFile = require('fs').writeFileSync;
const getNpmArgs = require('../utils/get-npm-args');

const pathJoin = path.join;

function init() {
  const testMode = process.argv.indexOf('--test-mode') > -1;

  // NOTE: don't run on dev installation (running `npm install` in this repo)
  if (!testMode) {
    const npmArgs = getNpmArgs();

    if (!npmArgs || !npmArgs.some(arg => /^antd-tools(@\d+\.\d+.\d+)?$/.test(arg))) {
      return;
    }
  }
  // NOTE: <projectDir>/node_modules/antd-tools/lib
  const projectDir = pathJoin(__dirname, '../../../');

  const cfg = require(path.join(projectDir, 'package.json'));
  console.log(cfg);
  if (!cfg) {
    process.exit(1);
  } else {
    if (!cfg.scripts) {
      cfg.scripts = {};
    }

    if (cfg.scripts.pub) {
      return false;
    }

    cfg.scripts = Object.assign(cfg.scripts, {
      dist: 'antd-tools run dist',
      compile: 'antd-tools run compile',
      clean: 'antd-tools run clean',
      start: 'antd-tools run start',
      site: 'antd-tools run site',
      deploy: 'antd-tools run update-self && antd-tools run deploy',
      'just-deploy': 'antd-tools run just-deploy',
      pub: 'antd-tools run update-self && antd-tools run pub',
    });

    if (cfg.scripts.prepublish) {
      cfg.scripts['pre-publish'] = cfg.scripts.prepublish;
    }

    cfg.scripts.prepublish = 'antd-tools run guard';

    writeFile(pathJoin(projectDir, 'package.json'), JSON.stringify(cfg, null, 2));
    console.log(cfg);
    return true;
  }
}

module.exports = function (done) {
  init();
};


