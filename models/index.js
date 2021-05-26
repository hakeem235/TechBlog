const User = require('./User');
const Bolg = require('./Bolg');

User.hasMany(Bolg , {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Bolg };