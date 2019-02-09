const http = require('http')

let persons = [
  {
    "name": "Joku Nimi",
    "number": "0501234567",
    "id": 1
  },
  {
    "name": "Poistettava Nimi",
    "number": "0501234567",
    "id": 2
  },
  {
    "name": "Uusi Nimi",
    "number": "",
    "id": 4
  }
]

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })  
  res.end(JSON.stringify(persons))
});

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)