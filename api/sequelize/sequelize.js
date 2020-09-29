let Sequelize = require('sequelize');
let UserModel =require('../models/user-model');
let ClientModel =require('../models/client-model');

const sequelize = new Sequelize({
  database: process.env.database,
  username: process.env.username,
  password: process.env.password,
  host: process.env.host,
  dialect: process.env.dialect,
  logQueryParameters: true
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));



sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('Users db and user table have been created');
});

const User = UserModel(sequelize, Sequelize);
const Client = ClientModel(sequelize, Sequelize);

module.exports = {User,Client};