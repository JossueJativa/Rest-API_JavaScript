const { response } = require("express");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res = response) => {
    const{ email, password } = req.body;

    try{
        //check email
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                msg: 'User/Password are not correct - email'
            });
        }
        //check if user is active
        if(!user.state){
            return res.status(400).json({
                msg: 'User/Password are not correct - state: false'
            });
        }

        //check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User/Password are not correct - password'
            });
        }

        //generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error',
        });
    }
}

module.exports = {
    login
}