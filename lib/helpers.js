var request = require('request');

function getSite(url, callback) {
  request(url, function(err, response, body){
    if(err){
      console.log(err);
      return callback(err);
    }
    var results = parseResults(body);
    callback(null, results);
  });
}

function parseResults(results){
  var array = JSON.parse(results);
  return array.map(function(site){
    return { link: site.url, title: site.title, score: site.score };
  });
}

exports.getSite = getSite;
