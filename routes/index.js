var express = require('express');
var router = express.Router();

var sites = [{site: 'Hacker News'},{site: 'Echo JS'},{site: 'Slashdot'},
  {site: 'Product Hunt'}, {site: 'Github Trend'}];
router.get('/', function(req, res){
  res.render('index', { sites: sites });
});

module.exports = router;
