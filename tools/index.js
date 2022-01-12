const fs = require('fs')
const { resolve } = require('path')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const year = new Date().getFullYear().toString()

module.exports.PATH_BASE = resolve('dist', 'bundle')

module.exports.headerMessage = `/*!
 *   ${pkg.name} v${pkg.version}
 *   ${pkg.description}
 *   Copyright (c) 2020-${year} ${pkg.author.name}
 *   Released under the ${pkg.license} License.
 */`
