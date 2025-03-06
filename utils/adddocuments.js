const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const insertContacts = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("contacts"); 
    const collection = db.collection("contactList"); 

    const contacts = [
      {
        firstName: "John",
        lastName: "Thur",
        email: "john.thur@cse341.edu",
        favoriteColor: "Blue",
        birthday: "1965-05-15"
      },
      {
        firstName: "Alex",
        lastName: "Tarabay",
        email: "alex.tarabay@cse341.edu",
        favoriteColor: "Red",
        birthday: "1988-08-22"
      },
      {
        firstName: "Rick",
        lastName: "Ledford",
        email: "rick.ledford@cse341.edu",
        favoriteColor: "Purple",
        birthday: "1980-08-22"
      }
    ];

    const result = await collection.insertMany(contacts);
    console.log(`${result.insertedCount} contacts inserted!`);
  } catch (error) {
    console.error("Error inserting contacts:", error);
  } finally {
    await client.close();
  }
};

insertContacts();
