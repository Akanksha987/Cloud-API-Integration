const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/add', userController.addUser);
router.get('/list', userController.listUsers);
router.delete('/delete/:cloudApp/:userId', userController.deleteUser);

module.exports = router;
