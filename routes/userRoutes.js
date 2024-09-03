const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/:service/authorize', userController.authorizeUser.bind(userController));
router.get('/:service/users', userController.listUsers.bind(userController));
router.post('/:service/organizations/:uuid/invite', userController.inviteUserToService.bind(userController));
router.delete('/:service/organizations/:uuid/users/:userId', userController.removeUserFromService.bind(userController));

module.exports = router;