var request = require('request');

function getSite(url, redisClient, callback) {
  redisClient.get(url, function(err, links) {
    if(err) {
      return callback(err);
    } else if(links) {
      
      var sortedResults = parseAndSortResults(links);
      return callback(null, sortedResults);
    } else {

      request(url, function(err, response, body){
        if(err){
          console.log(err);
          return callback(err);
        }
        
        redisClient.setex(url, 3600, body, function(err, reply) {
          if(err) {
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

exports.getSite = getSite;
