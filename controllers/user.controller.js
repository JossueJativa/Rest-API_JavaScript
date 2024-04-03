const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const usuariosGet = (req = request, res = response) => {
    const { query, name = 'no name', apikey } = req.query;
    res.json({
        message: 'get api - controller',
        query: query,
        name: name,
        apikey: apikey
    });
}

const usuariosPost = async(req, res = response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json(err);
    }

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // check if email exists
    const email_ex = await User.findOne({ email });
    if (email_ex) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    try{
        await user.save();
    } catch (error) { console.log(error); }

    res.status(201).json({
        message: 'post api - controller',
        name,
        email,
        id: user._id
    });
}

const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        message: 'put api - controller',
        id: id
    });
}

const usuariosDelete = (req, res = response) => {
    const {id} = req.params;
    res.json({
        message: 'delete api - controller',
        id: id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch api - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}