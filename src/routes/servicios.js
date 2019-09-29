const router = require('express').Router();

router.get('/servicios', (req, res) => {
    res.render('servicios');
});

module.exports = router;