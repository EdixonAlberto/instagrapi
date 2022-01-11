const fs = require('fs')
const { resolve } = require('path')
const browserify = require('browserify')
const UglifyJS = require('uglify-js')

const { PATH_BASE, getHeaderMessage } = require('.')

let browserifyObject = browserify(resolve('tools', 'templateBundle.js'), {
  debug: true
})

browserifyObject.bundle((err, buffer) => {
  if (err) console.error('ERROR-BUNDLE ->', err.message)
  else {
    const code = `${getHeaderMessage}\n${buffer}`

    fs.mkdir(PATH_BASE, null, err => {
      if (err) console.error('ERROR-BUNDLE ->', err.message)
      else {
        const pathBundle = resolve(PATH_BASE, 'instagrapi.js')

        fs.appendFile(pathBundle, code, { encoding: 'utf8' }, err => {
          if (err) console.error('ERROR-BUNDLE ->', err.message)
          else {
            const code = fs.readFileSync(pathBundle, 'utf8')
            fs.rm(pathBundle, () => null)

            const result = UglifyJS.minify(code, {
              output: {
                preamble: getHeaderMessage()
              },
              warnings: true
            })

            if (result.code) {
              fs.writeFile(resolve(PATH_BASE, 'instagrapi.min.js'), result.code, { encoding: 'utf8' }, () => {
                console.log(`Bundle created in ${PATH_BASE}`)
              })
            } else console.error('ERROR-MINIFY ->', result.error.message || result.warnings)
          }
        })
      }
    })
  }
})
