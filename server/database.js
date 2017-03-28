var Sequelize = require('sequelize');

if(process.env.CLEARDB_DATABASE_URL) {
  db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    pool: {
      min: 1,
      max: 5,
      idle: 20000
    }
  });
} else {
  db = new Sequelize('buzzme_db', 'root', '', {
    dialect: 'mysql',
    port: 3306,
    pool: {
      min: 1,
      max: 5,
      idle: 20000
    }
  });
}

var Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING
});
Users.sync({});

var Grudges = db.define('Grudges', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  offender: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
  madSince: Sequelize.DATE,
  offense: Sequelize.STRING,
  forgiven: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Grudges.sync({});
Grudges.belongsTo(Users, {foreignKey: 'user_id'});

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function(err) {
    console.log('Unable to connect to the database: ', err);
  });

module.exports = {
  Grudges: Grudges,
  Users: Users,
  data: db
};
