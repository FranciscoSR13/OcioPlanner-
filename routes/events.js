const express = require('express');
const router = express.Router();
const Events = require('../controllers/eventsController');
const { authMiddleware } = require('../controllers/authController');

router.get('/', Events.listAll);
router.post('/', authMiddleware, Events.createEvent);
router.get('/:id', Events.getEvent);
router.post('/:id/options', authMiddleware, Events.addOption); // añadir opción
module.exports = router;
