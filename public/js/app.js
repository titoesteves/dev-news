var $links = $('.links'),
  $site = $('.aside li');

$(document).ready(function() {

  $site.on('click', siteClick);
});

function siteClick(event){
  var siteUrl = '/' + event.target.innerHTML;
  if(siteUrl.indexOf('Echo') > -1){
    $.get(siteUrl, function(data){
      data.forEach(getEachJsonItem);
    });
  } else {
    $.get(siteUrl, function(data) {
      $links.html('');
      data.forEach(getEachJsonItem);
    });
  }
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
        link: $this.find('link').text()
      };
    displayLink(obj);
  }
}

function getEachJsonItem(obj){
  var link = { link: obj.link, title: obj.title };
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
      data.forEach(getEachJsonItem);
    });
  }
}

