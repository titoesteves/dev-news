var express = require('express');
var helpers = require('../lib/helpers');
var router = express.Router();

var sites = [
  { site: 'Hacker News', url: 'http://reader.one/api/news/hn?limit=20' },
  { site: 'Echo JS', url: 'http://www.echojs.com/rss' },
  { site: 'Slashdot', url: 'http://reader.one/api/news/slashdot?limit=20' },
  { site: 'Product Hunt', url: 'http://reader.one/api/news/ph' }, 
  { site: 'Github Trend', url: 'http://reader.one/api/news/github?limit=20' }
];

router.get('/', function(req, res){
  var hn = sites[0].url;
  console.log(hn);
  helpers.getSite(hn, function(err, links){
    if(err){
      console.log('Error getting links', err);
      res.send('Error occurred');
    }
    console.log(links);
    res.render('index', { links: links, sites: sites });
  });
  // console.log(json)
});

router.get('/:site', function(req, res){

});

module.exports = router;
