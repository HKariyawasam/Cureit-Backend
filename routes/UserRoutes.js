const express = require('express');

const router = express.Router();

let userController = require('../controllers/UserController')


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:email', userController.getOneUser);
router.put('/:email', userController.updateUser);
router.put('/:email/:pwd', userController.updateUserPassword);
router.delete('/:email', userController.deleteUser);


module.exports = router;