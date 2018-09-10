const router = require('express-promise-router')();

const RentalController = require('../controllers/RentalController');

router.get('/', RentalController.index.bind(RentalController));

router.get('/rentalsList', RentalController.getLimited.bind(RentalController));

router.get('/:id', RentalController.getRental.bind(RentalController));

router.post('/', RentalController.create.bind(RentalController));

router.put('/:id', RentalController.update.bind(RentalController));

router.delete('/:id', RentalController.destroy.bind(RentalController));

module.exports = router;
