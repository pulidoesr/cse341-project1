const express = require("express")
const router = new express.Router() 

const contactController = require('../controllers/contactsController')

router.get('/', contactController.getAll);

router.get('/:id', contactController.getOne);

router.post('/', contactController.createContact);

router.put('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;