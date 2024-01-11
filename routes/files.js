var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('files', { title: 'Documentos', session: req.session });
});

module.exports = router;
