const express = require("express")
const router = new express.Router()
const contactController = require('../controllers/contactsController')
const validation = require('../middleware/validation')

router.get('/', contactController.getAll);

router.get('/:id', contactController.getOne);

router.post('/', validation.saveContact, contactController.createContact);

router.put('/:id', validation.saveContact, contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;