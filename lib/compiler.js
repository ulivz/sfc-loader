const webpack = require('webpack')

exports.compile = function (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        return reject(({ err, stats }))
      }
      resolve(stats)
    })
  })
}
