const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {
    // const { query, name = 'no name', apikey } = req.query;
    const { limit = 5, desde = 0 } = req.query;

    const [ total, users ] = await Promise.all([
        User.countDocuments({ status: true }), 
        User.find({ status: true })
        .skip(Number(desde))
        .limit(Number(limit))
    ]);
    res.json({
        total,
        users
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
        name,
        email,
        id: user._id
    });
}

const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id, password, from_google, email, ...rest} = req.body;

    // validate against database
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const userdb = await User.findByIdAndUpdate(id, rest);
    res.json({
        user: userdb
    });
}

const usuariosDelete = (req, res = response) => {
    const {id} = req.params;
    // Borrar fisicamente
    // const user = User.findByIdAndDelete(id); No hacer de esta manera

    // Borrado lógico
    const user = User.findByIdAndUpdate(id, {status: false});


    res.json({
        user
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