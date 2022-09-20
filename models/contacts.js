const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

console.log(contactsPath);

const listContacts = async () => {
      const result = await fs.readFile(contactsPath);

    return JSON.parse(result);
}

const getContactById = async (contactId) => {
    //   const contactsList = await listContacts();
    // const contactEl = contactsList.find(({id}) => id === contactId);

    // if (!contactEl) {
    //     throw new Error('Contact not found');
    // }

    // return contactEl;
}

const removeContact = async (contactId) => {}

const addContact = async (name, email, phone) => {
      const contactsList = await listContacts();
    const  newContactEl = {
        id: uuidv4(),
        name, 
        email,
        phone
    }

    contactsList.push( newContactEl);

    fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return newContactEl;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
