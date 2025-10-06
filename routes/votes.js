const express = require('express');
const router = express.Router();
const Votes = require('../controllers/votesController');
const { authMiddleware } = require('../controllers/authController');

router.post('/:optionId', authMiddleware, Votes.voteOption);
router.get('/event/:eventId/results', Votes.resultsForEvent);

module.exports = router;
