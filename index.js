const express = require("express");
let morgan = require("morgan");

const server = express();
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan("combined"));

let persons = [
  {
    id: 1,
    name: "Atro Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-532352355",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-23435",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    nummber: "39-23-6423122",
  },
];

server.get("/", (request, resonse) => {
  resonse.send("</>Home Page here</h1>");
});

server.get("/api/persons", (req, res) => {
  res.json(persons);
});

server.get("/info", (req, res) => {
  const len = persons.length;
  const date = new Date().toDateString();

  res.send(`<p>Phone has info for ${len} <br/> ${date}</p>`);
});

server.get("/api/person/:id", (req, res) => {
  const id = Number(req.params.id);
  const personFound = persons.find((person) => person.id === id);
  personFound
    ? res.send(
        `Found <br> <p>Name: ${personFound.name} <br/>Number: ${personFound.number}</p>`
      )
    : res.status(404).end();
});

server.delete("/api/person/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.json(persons);
});

const generateId = () => {
  const max =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;

  return max + 1;
};

server.post("/api/person", (req, res) => {
  const data = req.body;

  if (!data.name) {
    return res.status(400).json({
      error: "name not supplied",
    });
  }
  const exist = persons.map((person) => person.name === data.name);

  if (exist) {
    return res.status(404).json({ error: "name must be unique" });
  }
  const newPerson = {
    id: generateId(),
    name: data.name,
    number: "12-32-122-34",
  };
  persons = persons.concat(newPerson);

  res.json(persons);
});

const PORT = 3001;

server.listen(PORT, () => console.log("I am ruuning now"));
