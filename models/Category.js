const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// extends off Sequelize's Model class
class Category extends Model { }

// fields and rules for Category model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false

    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true
  }
);

module.exports = Category;
