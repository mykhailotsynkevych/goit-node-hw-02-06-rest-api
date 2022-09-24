const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../.././models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();

    res.json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [contactById] = await getContactById(req.params.id);

    res.json(contactById);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);

  res.status(201).json(id, newContact);
});

router.delete("/:id", async function (req, res, next) {
  try {
    await removeContact(req.params.id);

    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const updatedContact = await updateContact(
      req.params.id,
      name,
      email,
      phone
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
