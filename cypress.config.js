const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // register tasks
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        table(data) {
          console.table(data)
          return null
        },
      })

      // always return the config
      return config
    },
  },
})

