// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const User = require('./user')(sequelize);
const Event = require('./event')(sequelize);
const Option = require('./option')(sequelize);
const Vote = require('./vote')(sequelize);
const Message = require('./message')(sequelize);

// Relaciones
User.hasMany(Event, { as: 'createdEvents', foreignKey: 'creatorId' });
Event.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

Event.hasMany(Option, { as: 'options', foreignKey: 'eventId' });
Option.belongsTo(Event, { foreignKey: 'eventId' });

User.belongsToMany(Option, { through: Vote, as: 'votedOptions' });
Option.belongsToMany(User, { through: Vote, as: 'voters' });

Event.hasMany(Message, { as: 'messages', foreignKey: 'eventId' });
Message.belongsTo(User, { as: 'author', foreignKey: 'userId' });

module.exports = { sequelize, User, Event, Option, Vote, Message };
