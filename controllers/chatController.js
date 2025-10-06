const { Message } = require('../models');

const getMessages = async (req,res)=>{
  const eventId = req.params.eventId;
  const msgs = await Message.findAll({ where: { eventId }, order: [['createdAt','ASC']], include: ['author'] });
  res.json(msgs);
};

const postMessage = async (req,res)=>{
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const text = req.body.text || null;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  const m = await Message.create({ text, imageUrl, eventId, userId });
  res.json(m);
};

module.exports = { getMessages, postMessage };
