const pickSpecs = require('./pick-specs')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // include any other plugin code...

  // split spec files
  pickSpecs(config)

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
}