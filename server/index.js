const express = require('express')
const { config } = require('dotenv')
const { Instagrapi } = require('../dist')

config()

const { PORT, SESSION_ID, PROXY } = process.env

const server = express()
const instagrapi = new Instagrapi({
  sessionId: SESSION_ID,
  proxy: PROXY
})

server.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

server.get('/', async (_req, res) => {
  res.status(200).json({
    versionInstagrapi: '0.0.0'
  })
})

server.get('/:command', async (req, res) => {
  const { command } = req.params
  const { data } = req.query

  console.log(`${command} -> ${data}`)

  try {
    const response = await instagrapi[command](data)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      message: error?.message || error
    })
  }
})

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`)
})
