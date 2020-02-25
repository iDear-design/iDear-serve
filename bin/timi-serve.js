#!/usr/bin/env node
const Service = require('../cli/Service')
const service = new Service(process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'report',
    'watch',
    // serve
    'open',
    'copy'
  ]
})
const command = args._[0]
service.run(command, args, rawArgv).catch(err => {
  process.exit(1)
})
