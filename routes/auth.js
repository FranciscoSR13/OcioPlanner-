const express = require('express');
const router = express.Router();
const Auth = require('../controllers/authController');

// register, login, profile
router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.get('/me', Auth.me); // require token - middleware dentro del controlador

module.exports = router;
