const express = require('express');
const router = express.Router();
const Chat = require('../controllers/chatController');
const { authMiddleware } = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/event/:eventId', Chat.getMessages);
router.post('/event/:eventId', authMiddleware, upload.single('image'), Chat.postMessage);

module.exports = router;
