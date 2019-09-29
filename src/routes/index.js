const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/servicios', (req, res) => {
    res.render('servicios');
});

module.exports = router;