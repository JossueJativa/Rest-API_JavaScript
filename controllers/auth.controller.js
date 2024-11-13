const { response } = require("express");
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Check email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                msg: 'User/Password are not correct - email'
            });
        }

        // Check if user is active
        if (!user.status) {
            return res.status(400).json({
                msg: 'User/Password are not correct - status: false'
            });
        }

        // Check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password are not correct - password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error',
        });
    }
}

module.exports = {
    login
}