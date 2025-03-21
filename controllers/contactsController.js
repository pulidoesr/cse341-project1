
const { getDb } = require('../models/connect');
const { ObjectId } = require('mongodb')

const contacts = {}

contacts.getAll = async (req, res) => {
  try {
      const db = getDb();
      const contacts = await db.collection('contactList').find().toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
  } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Internal Server Error" });
  };
};

contacts.getOne = async (req, res) => {

  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contacts = await db.collection('contactList').findOne({_id:contactId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
} catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
};
};

contacts.createContact = async(req, res) => {
  try {
    const db = getDb();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
      }
    const response = await db.collection('contactList').insertOne(contact);
    if (response.insertedId) {
      res.status(201).json({message: "Contact added successfully", contactId: response.insertedId});
    } else {
      res.status(500).json(response.error) || 'Some error occured while adding the user'
    }
    } catch (error) {
      console.error("Error fetching contact:", error.message);
    };
  };

contacts.updateContact = async(req, res) => {
  try {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await db.collection('contactList').replaceOne({_id: contactId}, contact);
  if (response.modifiedCount > 0) {
    res.status(204).json({message: "Contact updated successfully", contactId});
  } else {
    res.status(500).json(response.modifiedCount) || 'Some error occured while adding the contact'
  }
  } catch (error) {
    console.error("Error fetching contact:", error);
  };
  };

contacts.deleteContact = async(req, res) => {
  try {
    const db = getDb();  
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const response = await db.collection('contactList').deleteOne({_id: new ObjectId(contactId)});
    if (response.deletedCount > 0) {
      res.status(204).json({message: "Contact deleted successfully", contactId});
    } else {
      res.status(404).json({error: "Contact not found"})
    }
    } catch (error) {
      console.error("Error fetching contact:", error.message);
    };
  };

module.exports = contacts;
