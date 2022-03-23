const fs = require('fs')
const glob = require('glob')
const path = require('path')

const sizeMap = new Map()
const sizeOf = file => {
  if (!sizeMap.has(file)) {
    sizeMap.set(file, fs.statSync(file).size)
  }
  return sizeMap.get(file)
}

module.exports = config => {
  const groupId = parseInt(process.env.GROUP_INDEX || 0, 10)
  const total = parseInt(process.env.PARALLEL_GROUPS || 1, 10)

  if (groupId < 0 || total <= 1) {
    return
  }

  const specs = glob.sync(path.join(config.integrationFolder, config.testFiles))

  config.testFiles = specs
    .sort((lhs, rhs) => sizeOf(rhs) - sizeOf(lhs))
    .filter((_, index) => index % total === groupId)
}
