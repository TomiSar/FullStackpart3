const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())
var morgan = require('morgan')
//app.use(morgan('tiny'))

app.use(morgan(':method :url :res :status :response-time[4] ms'));

morgan.token('res', function(res) {
  return JSON.stringify(res.body);
});




let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

//print some info
app.get("/", (req, res) => {
  res.send("<h4>Phonebook backend</h4>");
});

//3.1: puhelinluettelon backend step1
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//3.2: puhelinluettelon backend step2
app.get("/info", (request, response) => {
  response.send(`<strong><p>Phonebook has info for ${
    persons.length
  } people</p></strong>
    <p><h3>${new Date()}<h3></p>`);
});

//3.3: puhelinluettelon backend step3
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).end();
  } else {
    response.json(person);
  }
});

//3.4: puhelinluettelon backend step4
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end(); // 204 no content sillä mukaan ei lähetetä mitään dataa.
});

//3.5-3.6: puhelinluettelon backend step5-step6
app.post('/api/persons', (req, res) => {
    const body = req.body;
    const randomNumber = Math.floor(Math.random() * 1200000 + 1);
    console.log(body);
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name is missing' });
    } else if (body.number === undefined) {
      return response.status(400).json({ error: 'number is missing' });
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: randomNumb
    };
  
    persons = persons.concat(person);
    res.json(person);
  });
  

//url = `localhost:${port}/api`;
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
