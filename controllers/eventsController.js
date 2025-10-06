const { Event, Option, User } = require('../models');

const listAll = async (req,res)=>{
  const events = await Event.findAll({ include: [{ model: Option, as: 'options' }, { model: User, as:'creator'}], order:[['datetime','ASC']]});
  res.json(events);
};

const createEvent = async (req,res)=>{
  const { title, description, datetime, location, options } = req.body;
  if (!title) return res.status(400).json({error:'Title required'});
  const ev = await Event.create({ title, description, datetime, location, creatorId: req.user.id });
  if (Array.isArray(options)) {
    await Promise.all(options.map(opt => Option.create({ text: opt, eventId: ev.id })));
  }
  const saved = await Event.findByPk(ev.id, { include: [{ model: Option, as:'options'}]});
  res.json(saved);
};

const getEvent = async (req,res)=>{
  const ev = await Event.findByPk(req.params.id, { include: [{ model: Option, as:'options'}, { model: User, as:'creator' }]});
  if (!ev) return res.status(404).json({ error:'Not found' });
  res.json(ev);
};

const addOption = async (req,res)=>{
  const { text } = req.body;
  if (!text) return res.status(400).json({ error:'Text required' });
  const ev = await Event.findByPk(req.params.id);
  if (!ev) return res.status(404).json({ error:'Event not found' });
  const opt = await Option.create({ text, eventId: ev.id });
  res.json(opt);
};

module.exports = { listAll, createEvent, getEvent, addOption };
