'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST: '"http://moapa.local.com:3000"'
  API_HOST: '"http://moapitest.free.idcfengye.com"'
})
