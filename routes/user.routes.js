const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { isRoleValid, isEmailExist, isUserIdExist } = require('../helpers/db_validators');
const { validateCampus } = require('../middlewares/checkcampus');
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email need a validate email').isEmail(),
    check('email').custom( isEmailExist ),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    // check('role', 'Role is required').not().isEmpty(),
    check('role').custom( isRoleValid ),
    validateCampus
], usuariosPost );

router.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom( isUserIdExist ),
    check('role').custom( isRoleValid ),
    validateCampus
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom( isUserIdExist ),
    validateCampus
], usuariosDelete);

module.exports = router;