const router = require ('express').Router();
// routes
router.get('/', (req, res) => {
	res.render('index.ejs');
});

module.exports = router;