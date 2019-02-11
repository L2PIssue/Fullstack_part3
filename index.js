const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morganBody = require('morgan-body') 
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morganBody(app)

let persons = [ 
  {
    "name": "Toimiikohan Nodemon",
    "number": "0501234567",
    "id": 1
  },
  {
    "name": "Poistettava Nimi", 
    "number": "0501234567",
    "id": 2
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  date = new Date()
  text = "<p>Puhelinluettelossa on " 
        + persons.length 
        + " henkilön tiedot</p>"
        + "<p>"
        + date
        + "</p>"
  res.send(text)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)  
  } else {    
    res.status(404).end()  
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body

  // Check if name already in the book
  if (persons.some(e => e.name === body.name)) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  // Check if name and number are given
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ 
      error: 'both name and number must be given' 
    })
  }

  persons = persons.concat(body)
  res.json(body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})