// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authMiddleware = async (req,res,next)=>{
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const register = async (req,res)=>{
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ where: { email }});
    if (existing) return res.status(400).json({ error:'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl }});
  } catch(e){ res.status(500).json({error: e.message}); }
};

const login = async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl }});
  } catch(e){ res.status(500).json({error: e.message}); }
};

const me = [authMiddleware, async (req,res)=>{
  const u = req.user;
  res.json({ id: u.id, name: u.name, email: u.email, avatarUrl: u.avatarUrl });
}];

module.exports = { register, login, me, authMiddleware };
