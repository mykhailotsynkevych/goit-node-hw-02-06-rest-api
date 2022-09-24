const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const contactsFunc = require('./models/contacts')

const app = express()
app.use(express.json())

app.get('/api/contacts', async function (req, res) {
  const contactsList = await contactsFunc.listContacts();

  // res.send(contactsList);

  res.status(200).json(contactsList)
})

app.get('/api/contacts/:id', async function (req, res) {
  const { id } = req.params;

  const contactById = await contactsFunc.getContactById(id);

  res.status(200).json(contactById)
})

app.post('/api/contacts', async function (req, res) {
    const {name, email, phone} = req.body;
    const newContact = await contactsFunc.addContact(name, email, phone);

    res.status(201).json(newContact)
})

app.delete('/api/contacts/:id', async function (req, res) {
  const { id } = req.params;

  const deletedContactById = await contactsFunc.removeContact(id);

  res.status(200).json({"message": "contact deleted"})
})

app.put('/api/contacts/:id', async function (req, res) {
  const { id } = req.params;
  const {name, email, phone} = req.body;

  const updatedContact = await contactsFunc.updateContact(id, name, email, phone);

  res.status(204).json(updatedContact)
})


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())


app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
