var $links = $('.links'),
  $site = $('.aside li');

$(document).ready(function() {
  $site.on('click', siteClick);
});

function siteClick(event) {
  var siteUrl = '/' + event.target.innerHTML;
  if (siteUrl.indexOf('Echo') > -1) {
    $.get(siteUrl, function(data) {
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

function getEachJsonItem(obj) {
  var link = {
    link: obj.link,
    title: obj.title
  };
  displayLink(link);
}
