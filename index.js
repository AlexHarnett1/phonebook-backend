const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  let id = request.params.id;
  let person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.get('/info', (request, response) => {
  let date = new Date()
  let content = `<p>Phonebook has info for ${persons.length} people.</p>
                 <p>${date}</p>`
  response.send(content)
})

app.delete('/api/persons/:id', (request, response) => {
  let id = request.params.id;
  persons = persons.filter(person => person.id !== id)

  response.status(204).send()

})

app.post('/api/persons', (request, response) => {
  let body = request.body
  let name = body.name
  let number = body.number

  if (!name || !number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  
  if (persons.find(person => person.name === name)) {
    return response.status(409).send({
      error: 'name must be unique'
    })
  }

  let id = Math.floor(Math.random() * 1000000)
  const person = { id, name, number }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]