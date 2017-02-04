var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/public', express.static('public'))

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})