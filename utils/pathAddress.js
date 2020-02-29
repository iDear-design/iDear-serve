const path = require('path')

// path.join的方法
function pathJoin(dir) {
  return path.join(__dirname, '../../../' + dir)
}

// path.resolve的方法
function pathResolve(dir) {
  return path.resolve(__dirname, '../../../' + dir)
}

module.exports = {
  pathJoin,
  pathResolve
}
