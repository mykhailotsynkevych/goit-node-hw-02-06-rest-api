const Contact = require("../models/contactModel");

async function createContact(body) {
  return Contact.create(body);
}

async function getContactById(id) {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error(404, "Contact is not defined");
  }

  return contact;
}

async function getAllContacts(owner) {
  return Contact.find({owner}).populate('owner');;
}

async function deleteContact(id) {
  await Contact.findOneAndDelete({
      id,
      owner: _id,
    });
}

async function updateContact(id, body,) {
  return Contact.findOneAndUpdate({
        id,
        owner: _id,
      });
}

async function updateStatusContact(id, body) {
  return Contact.findByIdAndUpdate(id, body, { new: true });
}

module.exports = {
  createContact,
  getContactById,
  getAllContacts,
  deleteContact,
  updateContact,
  updateStatusContact,
};
