const router = require('express-promise-router')();

const UserController = require('../controllers/UserController');

router.get('/', UserController.index.bind(UserController));

router.get('/usersList', UserController.getLimited.bind(UserController));

router.get('/:email', UserController.getUser.bind(UserController));

router.post('/register', UserController.create.bind(UserController));

// router.put('/:id', UserController.update.bind(UserController));

// router.delete('/:id', UserController.destroy.bind(UserController));

module.exports = router;
