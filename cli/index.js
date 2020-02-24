#!/usr/bin/env node
'use strict'

require('colorful').colorful()

const program = require('commander')
const packageInfo = require('../package.json')

program
  .option('-d, --debug <type>', 'output extra debugging')
  .option('-s, --small <type>', 'small pizza size')
  .option('-p, --pizza <type>', 'flavour of pizza')

program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task', { isDefault: true })

program.parse(process.argv)

// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand
if (proc) {
  proc.on('close', () => {
    process.exit.bind(process)
  })
  proc.on('error', () => {
    process.exit(1)
  })
}

const subCmd = program.args[0]
if (!subCmd || subCmd !== 'run') {
  program.help()
}

console.log(1111111, process.argv, 999, program.pizza, 999, program.debug)
