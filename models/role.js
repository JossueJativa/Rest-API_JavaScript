const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database.sqlite')
});

const Role = sequelize.define('Role', {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'Role is required' }
        }
    }
});

module.exports = { Role, sequelize };