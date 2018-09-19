const router = require('express-promise-router')();
const { isAuthorized } = require('../../../middleware/authorization');
const { verificationMiddleware } = require('../../../middleware/userMiddlewares/verifyUser');

const UserController = require('../controllers/UserController');

router.get('/', isAuthorized, verificationMiddleware, UserController.index.bind(UserController));

router.get('/limit/:limit/page/:page', isAuthorized, verificationMiddleware, UserController.getLimited.bind(UserController));

router.get('/mobile/:mobile', isAuthorized, verificationMiddleware, UserController.getUser.bind(UserController));

router.get('/id/:id', isAuthorized, verificationMiddleware, UserController.getUser.bind(UserController));

router.post('/register', UserController.create.bind(UserController));

router.delete('/delete/id/:id', isAuthorized, verificationMiddleware, UserController.deleteUser.bind(UserController));

router.delete('/delete/mobile/:mobile', isAuthorized, verificationMiddleware, UserController.deleteUser.bind(UserController));

// router.put('/id/:id', UserController.update.bind(UserController));

// router.put('/mobile/:mobile', UserController.update.bind(UserController));

module.exports = router;
