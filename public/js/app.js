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
    $title.text(obj.title).appendTo($link);
    $links.append($link);
  }

  function getEachJsonItem(obj) {
    var link = {
      link: obj.link,
      title: obj.title
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
