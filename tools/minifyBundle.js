const fs = require('fs');
const { resolve } = require('path');
const UglifyJS = require('uglify-js');
const { PATH_BASE, getHeaderMessage } = require('.');

const code = fs.readFileSync(resolve(PATH_BASE, 'instagrapi.js'), 'utf8');

const options = {
  output: {
    preamble: getHeaderMessage()
  },
  warnings: true
};
const result = UglifyJS.minify(code, options);

if (result.code) {
  fs.writeFile(
    resolve(PATH_BASE, 'instagrapi.min.js'),
    result.code,
    {
      encoding: 'utf8'
    },
    () => console.log(`Bundle minified in ${PATH_BASE}`)
  );
} else console.error('ERROR-MINIFY ->', result.error.message || result.warnings);
