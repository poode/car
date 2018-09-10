const router = require('express-promise-router')();

const GenreController = require('../controllers/GenreController');

router.get('/', GenreController.index.bind(GenreController));

router.get('/genresList', GenreController.getLimited.bind(GenreController));

router.get('/:id', GenreController.getGenre.bind(GenreController));

router.post('/', GenreController.create.bind(GenreController));

router.put('/:id', GenreController.update.bind(GenreController));

router.delete('/:id', GenreController.destroy.bind(GenreController));


module.exports = router;
