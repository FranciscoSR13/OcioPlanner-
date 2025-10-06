const { Vote, Option, User, sequelize } = require('../models');

const voteOption = async (req,res)=>{
  const optionId = req.params.optionId;
  const userId = req.user.id;
  // simple: prevent duplicate vote by same user for same option (but allow multiple options for event is out-of-scope)
  const existing = await Vote.findOne({ where: { OptionId: optionId, UserId: userId }});
  if (existing) return res.status(400).json({ error:'Ya votaste esa opción' });
  const v = await Vote.create({ OptionId: optionId, UserId: userId });
  res.json({ ok: true, vote: v });
};

const resultsForEvent = async (req,res)=>{
  const eventId = req.params.eventId;
  // raw query to count votes per option
  const [results] = await sequelize.query(`
    SELECT o.id as optionId, o.text, COUNT(v.id) as votes
    FROM Options o
    LEFT JOIN Votes v ON v.OptionId = o.id
    WHERE o.eventId = :eventId
    GROUP BY o.id
  `, { replacements: { eventId }});
  res.json(results);
};

module.exports = { voteOption, resultsForEvent };
