var helpers = require('../lib/helpers');
var Xray = require('x-ray');
var xray = new Xray();
var express = require('express');
var router = express.Router();

var sites = {
  'Hacker News': 'http://reader.one/api/news/hn?limit=20',
  'Echo JS': 'http://www.echojs.com/rss',
  'Slashdot': 'http://reader.one/api/news/slashdot?limit=20',
  'Product Hunt': 'http://reader.one/api/news/ph',
  'Github Trend': 'http://reader.one/api/news/github?limit=20'
};

router.get('/', function(req, res){
  var hn = sites['Hacker News'];
  helpers.getSite(hn, function(err, links){
    if(err){
      console.log('Error getting links', err);
      res.send(new Error('Error occurred'));
    }
    res.render('index', { links: links, sites: sites });
  });
});

router.get('/:site', function(req, res){
  if(req.params.site.indexOf('Echo') > -1) {
    xray('http://www.echojs.com/', 'article h2', [{
      link: 'a@href',
      title: 'a'
    }])(function(err, newslist) {
      if(err){ 
        return console.log('err', err);
      }
      return res.send(newslist);
    });
  } else {
    var site = sites[req.params.site];
    helpers.getSite(site, function(err, links){
      if(err){
        console.log('Error getting links', err);
        res.send(new Error('Error occurred'));
      }
      res.send(links);
    });
  }
});

module.exports = router;
