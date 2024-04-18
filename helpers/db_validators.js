const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`Role ${role} is not registered in the DB`);
    }
}

const isEmailExist = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`Email ${email} is already registered`);
    }
}

const isUserIdExist = async(id) => {
    const existId = await User.findOne({ id });
    console.log(existId);
    if ( existId ) {
        throw new Error(`User ID ${id} is not registered in the DB`);
    }
}

module.exports = {
    isRoleValid,
    isEmailExist,
    isUserIdExist,
}