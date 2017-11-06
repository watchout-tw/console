require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.BUILD_MODE = process.argv.indexOf('production') > -1
  ? 'production'
  : 'staging'

console.log(process.env.BUILD_MODE)

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = process.env.BUILD_MODE === 'production'
  ? require('./webpack.prod.conf')
  : require('./webpack.staging.conf')

console.log(webpackConfig)

var spinner = ora(`building for ${process.env.BUILD_MODE}...`)
spinner.start()

rm(path.join(config.prod.assetsRoot, config.prod.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
