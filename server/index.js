const express = require('express')
const { config } = require('dotenv')
const { Instagrapi } = require('../dist')

config()

const { PORT, SESSION_ID } = process.env

const server = express()
const instagrapi = new Instagrapi({
  sessionId: SESSION_ID
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
      message: error.message
    })
  }
})

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`)
})