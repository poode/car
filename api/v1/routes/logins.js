const router = require('express-promise-router')();

const { index } = require('../controllers/LoginController');

router.post('/', index);

// router.get('/:id', LoginController.getLogin.bind(LoginController));

// router.post('/', LoginController.create.bind(LoginController));

// router.put('/:id', LoginController.update.bind(LoginController));

// router.delete('/:id', LoginController.destroy.bind(LoginController));

module.exports = router;
