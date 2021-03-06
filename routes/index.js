'use strict';
var helpers = require('../lib/helpers');
var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisClient;

if (process.env.NODE_ENV === 'production') {
  var url = require('url').parse(process.env.REDIS_URL);
  redisClient = redis.createClient(url.port, url.hostname);
  redisClient.auth(url.auth.split(':')[1]);
  redisClient.flushdb(function (err, succeeded) {
    if (err) {
      console.log('Error trying to clear redis cache', err.message);
      return;
    }
    console.log('Redis cache cleared'); 
  });
} else {
  redisClient = redis.createClient(6379, '127.0.0.1');
}

redisClient.on('connect', function () {
  console.log('Redis connected');
});

var sites = {
  'Hacker News': 'http://reader.one/api/news/hn?limit=20',
  'Echo JS': 'http://www.echojs.com/rss',
  'Slashdot': 'http://reader.one/api/news/slashdot?limit=20',
  'Product Hunt': 'http://reader.one/api/news/ph',
  'Github Trend': 'http://reader.one/api/news/github?limit=20'
};

router.get('/', function (req, res) {
  var hn = sites['Hacker News'];
  getSite(true, hn, res);
});

function getSite(shouldRender, site, res) {

  helpers.getSite(site, redisClient, function (err, links) {
    if (err) {
      res.send(err.message);
      return;
    }
    if (shouldRender) {
      res.render('index', { links: links, sites: sites });
      return;
    }
    res.send(links);
  });
}

router.get('/:site', function (req, res) {
  if (req.params.site.indexOf('Echo') > -1) {
    var opts = {
      params: {
        link: 'a@href',
        title: 'a'
      },
      url: 'http://www.echojs.com/',
      element: 'article h2',
      redisClient: redisClient
    };
    helpers.scrapeSite(opts, res);
  } else {
    var site = sites[req.params.site.trim()];
    getSite(false, site, res);
  }
});

helpers.loadSites(sites); // load sites on first run
helpers.loadSitesHourly(sites);

module.exports = router;
