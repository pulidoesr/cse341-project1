
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
  }
};

contacts.getOne = async (req, res) => {

  try {
    const contactId = new ObjectId(req.params.id);
    const db = getDb();
    const contacts = await db.collection('contactList').findOne({_id:contactId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
} catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
};


module.exports = contacts;