const sequelize = require('../config/connection');
const { User } = require('../models');
const { Post } = require('../models')
const { Comments } = require('../models')

const userData = require('./userData.json');
const postData = require('./postData.json')
const commentsData = require('./commentsData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await Comments.bulkCreate(commentsData, {
    individualHooks: true,
    returning: true,
  });

};


seedDatabase();