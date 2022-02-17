const fs = require('fs')

const fileMap = [
  { name: '.nycrc', type: 'json' },
  { name: '.nycrc.json', type: 'json' },
  { name: 'nyc.config.js', type: 'js' },
]

let dir = './coverage'

for (let i = 0; i < fileMap.length; i++) {
  const { name, type } = fileMap[i]

  if (!fs.existsSync(name)) {
    continue
  }

  const file = type === 'json'
    ? JSON.parse(fs.readFileSync(name))
    : require(process.cwd() + '/' + name)

  if (file['report-dir']) {
    dir = file['report-dir']
  }
}

console.log(`::set-output name=dir::${dir}`)