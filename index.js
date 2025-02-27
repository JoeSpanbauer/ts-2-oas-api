const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ts2Oas = require('@joespanbauer/ts-2-oas')

const app = express()

app.use(cors())

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
