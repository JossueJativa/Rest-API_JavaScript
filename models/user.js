const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database.sqlite') // Asegúrate de que esta ruta es correcta
});

// Definición de los modelos
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name is required' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Invalid email format' },
            notEmpty: { msg: 'Email is required' }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'The password is required' }
        }
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE',
        validate: {
            isIn: {
                args: [['ADMIN_ROLE', 'USER_ROLE']],
                msg: 'Role must be either ADMIN_ROLE or USER_ROLE'
            }
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    from_google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
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

User.belongsTo(Role, { foreignKey: 'role', targetKey: 'role' });
Role.hasMany(User, { foreignKey: 'role', sourceKey: 'role' });

sequelize.sync({ force: false }).then(() => {
    console.log('Tablas sincronizadas');
}).catch((error) => {
    console.error('Error sincronizando las tablas:', error);
});

module.exports = { User, Role, sequelize };