const express = require('express')
const path = require('path')
const app = express()

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

const jsonPath = require('../ressources/movie.json');
// Configure a 'get' endpoint for data..
app.get('/movies', function (req, res) {
  // Part 1: Remove the next line and replace with your code
  // res.send('!dlrow olleH')
  // wir wollen hier auf unsere ressources/movie.json zugreifen und dann wenn die GET actionmehtode aufgerufen wird das der ausgegeben wird
  res.json(jsonPath);
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

