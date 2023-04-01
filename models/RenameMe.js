const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class /*something*/ extends Model {}

/*something*/.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
  },
  {
    sequelize,
    timestamps: false, //possibly could want this as true
    freezeTableName: true,
    underscored: true,
    modelName: '/*something*/',
  }
);

module.exports = /*something*/;