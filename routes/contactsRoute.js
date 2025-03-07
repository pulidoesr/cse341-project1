// Needed Resources 
const express = require("express")
const router = new express.Router() 

const contactController = require('../controllers/contactsController')

router.get('/', contactController.getAll);
router.get('/:id', contactController.getOne);

module.exports = router;