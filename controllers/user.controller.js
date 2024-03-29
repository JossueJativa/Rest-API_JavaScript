const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { query, name = 'no name', apikey } = req.query;
    res.json({
        message: 'get api - controller',
        query: query,
        name: name,
        apikey: apikey
    });
}

const usuariosPost = (req, res = response) => {
    const {name, age} = req.body;

    res.status(201).json({
        message: 'post api - controller',
        name: name,
        age: age
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