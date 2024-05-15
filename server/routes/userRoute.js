const express = require('express');
const router = express.Router();
const {
    createUser,
    login,
    getAllUsers,
    getUserById,
    changePassword,
    deleteAcc
} = require('../controllers/userController');

router.post('/register', createUser, this.authController.Signup);
router.post('/login', login);
router.post('/', changePassword);
router.get('/', getAllUsers);
router.get('/', getUserById);
router.delete('/', deleteAcc);

module.exports = router;