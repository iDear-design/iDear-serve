const path = require('path')
const hash = require('hash-sum')

// Note: if a plugin-registered command needs to run in a specific default mode,
// the plugin needs to expose it via `module.exports.defaultModes` in the form
// of { [commandName]: mode }. This is because the command mode needs to be
// known and applied before loading user options / applying plugins.

class PluginAPI {
  /**
   * @param {string} id - Id of the plugin.
   * @param {Service} service - A vue-cli-service instance.
   */
  constructor(id, service) {
    this.id = id
    this.service = service
  }

  /**
   * Register a command that will become available as `vue-cli-service [name]`.
   *
   * @param {string} name
   * @param {object} [opts]
   *   {
   *     description: string,
   *     usage: string,
   *     options: { [string]: string }
   *   }
   * @param {function} fn
   *   (args: { [string]: string }, rawArgs: string[]) => ?Promise
   */
  registerCommand(name, opts, fn) {
    console.log(9911001100, 123456789, fn)
    if (typeof opts === 'function') {
      fn = opts
      opts = null
    }
    this.service.commands[name] = {fn, opts: opts || {}}
  }
}

module.exports = PluginAPI
