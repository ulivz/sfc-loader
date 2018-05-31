const {
  getOptions,
  parseQuery
} = require('loader-utils')

module.exports = function (source) {
  const options = getOptions(this)
  console.log(this.resourceQuery)
  // const params = parseQuery(this.resourceQuery)
  console.log(options)
  // console.log(params)
  return source;
}
