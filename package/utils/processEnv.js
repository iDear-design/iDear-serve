// 获取当前运行环境中文名称
function getNodeEnv(type) {
  let NodeEnv = process.env.NODE_ENV
  let ChNodeEnvName = NodeEnv === 'development' ? '开发环境' : '线上环境'
  let NodeEnvName = type === 'CH' ? ChNodeEnvName : NodeEnv
  return NodeEnvName
}

// 获取当前运行系统名称
function getPackageName() {
  let PackageName = process.env.npm_package_projectName || process.env.npm_package_name
  return PackageName
}

// 获取当前运行系统版本号
function getPackageVersion() {
  let PackageVersion = process.env.npm_package_version
  return PackageVersion
}

module.exports = {
  getNodeEnv,
  getPackageName,
  getPackageVersion
}
