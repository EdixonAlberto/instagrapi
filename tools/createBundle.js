const fs = require('fs')
const { resolve } = require('path')
const browserify = require('browserify')
const { PATH_BASE, getHeaderMessage } = require('.')

let browserifyObject = browserify(resolve('tools', 'templateBundle.js'), {
  debug: true
})

browserifyObject.bundle((err, buffer) => {
  if (err) console.error('ERROR-BUNDLE ->', err.message)
  else {
    const code = `${getHeaderMessage()}\n${buffer}`

    fs.mkdir(PATH_BASE, null, err => {
      if (err) console.error('ERROR-BUNDLE ->', err.message)
      else {
        fs.appendFile(resolve(PATH_BASE, 'instagrapi.js'), code, { encoding: 'utf8' }, err => {
          if (err) console.error('ERROR-BUNDLE ->', err.message)
          else console.log(`Bundle created in ${PATH_BASE}`)
        })
      }
    })
  }
})
