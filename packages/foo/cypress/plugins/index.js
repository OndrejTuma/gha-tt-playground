const parallelization = require('./parallelization')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  // split spec files
  parallelization(config)

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
}