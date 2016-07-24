var $links = $('.links'),
  $site = $('.aside li'),
  sites = {
    'Hacker News': 'https://news.ycombinator.com/rss',
    'Echo JS': '//www.echojs.com/rss',
    'Slashdot': 'http://reader.one/api/news/slashdot',
    'Product Hunt': 'https://www.producthunt.com/feed.atom',
    'Github Trend': 'https://github.com/trending'
  };

$(document).ready(function() {
  defaultDisplay(sites['Hacker News']);

  $site.on('click', siteClick);
});

function siteClick(event){
  var $target = $(event.target);
  var site = sites[event.target.innerHTML];
  console.log(site);
  getRss(site);
}

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

function getRss(rssUrl) {
  if ($links.html() !== '') {
    $links.html('');
    $.get(rssUrl, function(data) {
      var $xml = $(data);
      $xml.find('item').each(getEachItem);
    });
  }
}

function getJson(siteUrl){
  if ($links.html() !== '') {
    $links.html('');
    $.get(siteUrl, function(data) {
      var $xml = $(data);
      $xml.find('item').each(getEachItem);
    });
  }
}

function defaultDisplay(url) {
  getRss(url);
}
