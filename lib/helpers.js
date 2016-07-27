var request = require('request');

function getSite(url, callback) {
  request(url, function(err, response, body){
    if(err){
      console.log(err);
      return callback(err);
    }
    var results = parseResults(body);
    var sortedResults = sortResults(results);

    callback(null, sortedResults);
  });
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
