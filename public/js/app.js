var $links = $('.links'),
  $site = $('.aside li');

$(document).ready(function() {
  defaultDisplay();

  $site.on('click', function() {
    console.log('clicked');
    // $.ajax({});
  });
});

function createLink(obj) {
  var $link = $('<li class="link"/>');
  var $title = $(`<a class="title" href="${obj.link}" target="_blank"/>`);
  $title.text(obj.title).appendTo($link);
  $links.prepend($link);
}

function getEachItem(index) {
  if (index < 20) {
    var $this = $(this),
      obj = {
        title: $this.find('title').text(),
        link: $this.find('link').text(),
        description: $this.find('description').text(),
        pubDate: $this.find('pubDate').text(),
        author: $this.find('author').text()
      };
    createLink(obj);
  }
}

function defaultDisplay() {
  $.get('https://news.ycombinator.com/rss', function(data) {
    var $xml = $(data);
    $xml.find('item').each(getEachItem);
  });
}
