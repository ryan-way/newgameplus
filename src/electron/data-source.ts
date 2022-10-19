import { DataTypes, Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite',
});

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

export { User };
export default db;
