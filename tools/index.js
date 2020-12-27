const fs = require('fs');
const { resolve } = require('path');

module.exports.PATH_BASE = resolve('dist', 'bundle');

module.exports.getHeaderMessage = () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const year = new Date().getFullYear().toString();

  return `/*!
 *   ${pkg.name} v${pkg.version}
 *   ${pkg.description}
 *   Copyright (c) ${year} ${pkg.author.name}
 *   Released under the ${pkg.license} License.
 */`;
};
