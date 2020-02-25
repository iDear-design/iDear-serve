const PluginAPI = require('./PluginAPI')

module.exports = class Service {
  constructor(context) {
    process.TIMI_TOOLS = this
    this.initialized = false
    this.context = context
    this.commands = {}
    this.plugins = this.resolvePlugins()
    this.pluginsToSkip = new Set()
  }

  init() {
    if (this.initialized) {
      return
    }
    this.initialized = true
    this.plugins.forEach(({id, apply}) => {
      if (this.pluginsToSkip.has(id)) return
      apply(new PluginAPI(id, this))
    })
  }

  // 运行方法
  async run(name, args = {}, rawArgv = []) {
    this.setPluginsToSkip(args)
    this.init()
    args._ = args._ || []
    let command = this.commands[name]
    if (!command && name) {
      error(`command "${name}" does not exist.`)
      process.exit(1)
    }
    if (!command || args.help || args.h) {
      command = this.commands.help
    } else {
      args._.shift() // remove command itself
      rawArgv.shift()
    }
    const {fn} = command
    return fn(args, rawArgv)
  }

  // 获取运行插件
  resolvePlugins() {
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id)
    })

    const builtInPlugins = [
      './commands/serve'
    ].map(idToPlugin)

    let plugins = builtInPlugins
    return plugins
  }

  // 设置args
  setPluginsToSkip(args) {
    const skipPlugins = args['skip-plugins']
    const pluginsToSkip = skipPlugins
      ? new Set(skipPlugins.split(',').map(id => resolvePluginId(id)))
      : new Set()

    this.pluginsToSkip = pluginsToSkip
  }
}
