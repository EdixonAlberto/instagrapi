const fs = require('fs');
const { resolve } = require('path');
const UglifyJS = require('uglify-js');

const pathBase = resolve('dist', 'bundle');

const code = fs.readFileSync(resolve(pathBase, 'instagrapi.js'), 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const date = new Date().getFullYear().toString();

const options = {
  output: {
    preamble: `/*!
 *   ${pkg.name} v${pkg.version}
 *   ${pkg.description}
 *   Copyright (c) ${date} ${pkg.author.name}
 *   Released under the ${pkg.license} License.
 */`
  },
  warnings: true
};
const result = UglifyJS.minify(code, options);

if (result.code) {
  fs.writeFile(
    resolve(pathBase, 'instagrapi.min.js'),
    result.code,
    {
      encoding: 'utf8'
    },
    () => console.log(`Bundle minified in ${pathBase}`)
  );
} else console.error('ERROR-MINIFY ->', result.error.message || result.warnings);
