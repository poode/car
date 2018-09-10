const router = require('express-promise-router')();

const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.index.bind(CustomerController));

router.get('/customersList', CustomerController.getLimited.bind(CustomerController));

router.get('/:id', CustomerController.getCustomer.bind(CustomerController));

router.post('/', CustomerController.create.bind(CustomerController));

router.put('/:id', CustomerController.update.bind(CustomerController));

router.delete('/:id', CustomerController.destroy.bind(CustomerController));


module.exports = router;
