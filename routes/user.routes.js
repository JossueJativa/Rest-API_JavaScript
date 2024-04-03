const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { isRoleValid } = require('../helpers/db_validators');
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email need a validate email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    // check('role', 'Role is required').not().isEmpty(),
    check('role').custom( isRoleValid ),
], usuariosPost );

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', usuariosDelete);

module.exports = router;