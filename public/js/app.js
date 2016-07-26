var App = (function() {
  var $links, $site;

  function siteClick(event) {
    var siteUrl = '/' + event.target.innerHTML;
    $.get(siteUrl, function(data) {
      $links.html('');
      data.forEach(getEachJsonItem);
    });
  }

  function displayLink(obj) {
    var $link = $('<li class="link"/>');
    var $title = $(`<a class="title" href="${obj.link}" target="_blank"/>`);
    var $score = $('<span class="scores"/>');
    $score.text(obj.score || obj.stars);
    $title.text(obj.title + '\t');
    $score.appendTo($title);
    $title.appendTo($link);
    $links.append($link);
  }

  function getEachJsonItem(obj) {
    var link = {
      link: obj.link,
      title: obj.title,
      score: obj.score || '',
      stars: obj.stars || ''
    };
    displayLink(link);
  }

  function init() {
    $links = $('.links'), $site = $('.aside li');
    $site.on('click', siteClick);
  }
  return {
    init: init
  };
})();


$(document).ready(App.init);
