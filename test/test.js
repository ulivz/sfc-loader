const path = require('path');
const { compile } = require('../lib/compiler');
const Config = require('webpack-chain');

const config = new Config();
const outDir = path.resolve(__dirname, '../dist');
const isProd = process.env.NODE_ENV === 'production';

config
  .mode(isProd && !debug ? 'production' : 'development')
  .output
    .path(outDir)
    .filename(isProd ? '[name].[chunkhash:8].js' : '[name].js')
    .publicPath(isProd ? publicPath : '/')

config
  .entry('app')
    .add(path.resolve(__dirname, 'fixtures/index.js'))

config.resolveLoader
  .set('symlinks', true)
  .modules
    .add(path.resolve(__dirname, '../lib'))
    .add('node_modules')
  
config
  .module
  .rule('sfc')
    .resourceQuery(/inline/)
    .use('sfc-loader')
      .loader(require.resolve('../lib/sfc-loader.js'))
      .options({
        name: 'sfc-loader'
      })

const webpackConfig = config.toConfig()
// console.log(JSON.stringify(webpackConfig, null, 2))

compile(webpackConfig).then(stats => {
  // console.log(stats.toString({
  //   colors: true
  // }))
}).catch(({error, stats}) => {
  console.log('> Error')
  console.log(stats.toString({
    colors: true
  }))
})



