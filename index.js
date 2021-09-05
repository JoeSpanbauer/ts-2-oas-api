const express = require('express')
const bodyParser = require('body-parser')
const ts2Oas = require('@joespanbauer/ts-2-oas')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())

// Routes
app.post('/', (req, res) => {
  let result
  try {
    const { body } = req
    result = ts2Oas(body)
  } catch (e) {
    result = undefined
    res.status(500)
  }

  if (result) {
    res.send(result)
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000')
})
