var $links = $('.links'),
  $site = $('.aside li'),
  sites = {
    'Hacker News': 'http://reader.one/api/news/hn',
    'Echo JS': '//www.echojs.com/rss',
    'Slashdot': 'http://reader.one/api/news/slashdot',
    'Product Hunt': 'http://reader.one/api/news/ph',
    'Github Trend': 'http://reader.one/api/news/github'
  };

$(document).ready(function() {
  defaultDisplay(sites['Hacker News']);

  $site.on('click', siteClick);
});

function siteClick(event){
  var $target = $(event.target);
  var site = sites[event.target.innerHTML];
  console.log(site);
  getLinks(site);
}

function displayLink(obj) {
  var $link = $('<li class="link"/>');
  var $title = $(`<a class="title" href="${obj.link}" target="_blank"/>`);
  $title.text(obj.title).appendTo($link);
  $links.prepend($link);
}

function getEachRssItem(index) {
  if (index < 20) {
    var $this = $(this),
      obj = {
        title: $this.find('title').text(),
        link: $this.find('link').text(),
        description: $this.find('description').text(),
        pubDate: $this.find('pubDate').text(),
        author: $this.find('author').text()
      };
    displayLink(obj);
  }
}

function getEachJsonItem(obj){
  var link = { link: obj.url, title: obj.title };
  displayLink(link);
}

function getLinks(url) {
  $links.html('');
  var type = '';
  if(url.indexOf('rss') > -1){
    type = 'rss';
    getSite(type, url);
  } else {
    $.get(url, function(data){
      console.log('data', data);
      getSite(null, url);
    });
  }
}

function getSite(type, siteUrl){
  if(type === 'rss'){
    $.get(siteUrl, function(data) {
      var $xml = $(data);
      $xml.find('item').each(getEachRssItem);
    });
  } else {
    $.get(siteUrl, function(data) {
      var $data = $(data);
      console.log($data);
      data.forEach(getEachJsonItem);
    });
  }
}

function defaultDisplay(url) {
  getLinks(url);
}
