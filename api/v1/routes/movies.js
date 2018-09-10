const router = require('express-promise-router')();
const { isAuthorized } = require('../../../middleware/authorization');

const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.index.bind(MovieController));

router.get('/moviesList', MovieController.getLimited.bind(MovieController));

router.get('/:id', MovieController.getMovie.bind(MovieController));

router.post('/', isAuthorized, MovieController.create.bind(MovieController));

router.put('/:id', isAuthorized, MovieController.update.bind(MovieController));

router.delete('/:id', isAuthorized, MovieController.destroy.bind(MovieController));

module.exports = router;
