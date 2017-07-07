'use strict';
var request = require('request');
var async = require('async');
var Xray = require('x-ray'); // web scraper
var xray = new Xray();

function getSite(url, redisClient, callback) {
  redisClient.get(url, function(err, links) {
    if(err) {
      console.log('error getting cache');
      return callback(err);
    } else if(links) {
      var sortedResults = parseAndSortResults(links);
      return callback(null, sortedResults);
    } else {
      request(url, function(err, response, body){
        if(err){
          console.log('error making request', {err: err});
          return callback(err);
        }
        
        
        redisClient.setex(url, 3600, body, function(err, reply) {
          
          if(err) {
            console.log('error setting key/val in cache');
            console.log({err: err});
          }
          var sortedResults = parseAndSortResults(body);
          callback(null, sortedResults);
        });
        

      });
    }
  });
}

function parseAndSortResults(body) {
  var results = parseResults(body);
  return sortResults(results);
}

function sortResults(results){
  results.sort(function(a, b){ 
    if(a.score && b.score){
      return b.score - a.score; 
    } else if(a.stars && b.stars){
      return b.stars - a.stars;
    }
    return;
  });
  return results;
}

function parseResults(results){
  var array = JSON.parse(results);
  return array.map(function(site){
    return { link: site.url, title: site.title, score: site.score, stars: site.stars };
  });
}

function scrapeSite(opts, res) {
  opts.redisClient.get(opts.url, function (err, links) {
    if (err) {
      console.log('err', { err: err });
      res.send({ error: err });
    } else if (links) {
      var parseLinks = JSON.parse(links);
      res.send(parseLinks);
    } else {
      xray(opts.url, opts.element, [opts.params])(function (err, newslist) {
        opts.redisClient.setex(opts.url, 3600, JSON.stringify(newslist), function (err, reply) {
          if (err) {
            console.log('err', err);
            res.send({ error: err });
          }
          return res.send(newslist);

        });
      });

    }

  });
}

function loadSites(sites) {
  var siteArray = [];
  for (var key in sites) {
    siteArray.push(key);
  }
  async.eachSeries(siteArray, function (site, callback) {
    var url = 'http://localhost:3000/' + site;
    request(url, function (err) {
      if (err) {
        console.log('Error making request for ' + url, { error: err, url: url });
        return callback(err);
      }
      console.log('successfully requested ' + url);
      return callback(null);
    });
  }, function (err) {
    if (err) {
      console.log('Error loading sites hourly.', { error: err });
    } else {
      console.log('Load sites successfully');
    }
  });
}

function loadSitesHourly(sites) {
  setInterval(function(){
    loadSites(sites);  
  }, 1800000);
}

exports.getSite = getSite;
exports.scrapeSite = scrapeSite;
exports.loadSitesHourly = loadSitesHourly;
exports.loadSites = loadSites;
