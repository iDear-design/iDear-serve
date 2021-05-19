const fs = require('fs')

// 判断当前路径文件是否存在
function pathsIsExist(pathDir) {
  return fs.existsSync(pathDir)
}

// 编辑当前文件
function writeFile(pathDir, fileData) {
  fs.writeFileSync(pathDir, JSON.stringify(fileData, null, 2))
}

// 创建文件夹、文件目录
function mkdirFolder(pathDir) {
  fs.mkdirSync(pathDir)
}

module.exports = {
  pathsIsExist,
  writeFile,
  mkdirFolder
}
