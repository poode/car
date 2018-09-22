const router = require('express-promise-router')();
const { isAuthorized } = require('../../../middleware/authorization');
const { verificationMiddleware } = require('../../../middleware/userMiddlewares/verifyUser');

const UserController = require('../controllers/UserController');

const authVerifyMiddleware = [isAuthorized, verificationMiddleware];

router.get('/', authVerifyMiddleware, UserController.index.bind(UserController));
router.get('/limit/:limit/page/:page', authVerifyMiddleware, UserController.getLimited.bind(UserController));
router.get('/mobile/:mobile', authVerifyMiddleware, UserController.getUser.bind(UserController));
router.get('/id/:id', authVerifyMiddleware, UserController.getUser.bind(UserController));
router.delete('/delete/id/:id', authVerifyMiddleware, UserController.deleteUser.bind(UserController));
router.delete('/delete/mobile/:mobile', authVerifyMiddleware, UserController.deleteUser.bind(UserController));

router.post('/register', UserController.create.bind(UserController));

// this endpoint to post mobile and verification number to get verified mobile
router.post('/verify', UserController.getVerified.bind(UserController));

// this endpoint to send sms to requested mobile number which was registered
router.post('/verification/sms', isAuthorized, UserController.sendSmsVerification.bind(UserController));

// this endpoint for admins @TODO adding admin middleware employee middleware user middleware
router.post('/get/verification/number/by/mobile', isAuthorized, UserController.getVerificationNumberByMobile.bind(UserController));


// router.put('/id/:id', UserController.update.bind(UserController));

// router.put('/mobile/:mobile', UserController.update.bind(UserController));

module.exports = router;
