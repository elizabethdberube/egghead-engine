const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize/types');

const app = express();
const PORT = process.env.PORT || 3001;

startMySql();

async function startMySql() {
  const { host, port, user, database } = config.database;
  const connection = await mysql.createConnection({ host, port, user, database });

  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
  db.User = require('./routes')(sequelize);
  await sequelize.sync();
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {

  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

});



module.exports = db = {};