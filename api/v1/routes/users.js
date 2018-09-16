const router = require('express-promise-router')();

const UserController = require('../controllers/UserController');

router.get('/', UserController.index.bind(UserController));

router.get('/usersList', UserController.getLimited.bind(UserController));

router.get('/mobile/:mobile', UserController.getUser.bind(UserController));

router.get('/id/:id', UserController.getUser.bind(UserController));

router.post('/register', UserController.create.bind(UserController));

router.delete('/delete/id/:id', UserController.deleteUser.bind(UserController));

router.delete('/delete/mobile/:mobile', UserController.deleteUser.bind(UserController));

// router.put('/:id', UserController.update.bind(UserController));

// router.delete('/:id', UserController.destroy.bind(UserController));

module.exports = router;
