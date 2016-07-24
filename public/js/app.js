$(document).ready(function(){
  

  var $site = $('.aside li'), $links = $('.links');
  defaultDisplay($links);


  $site.on('click', function(event){
    console.log('clicked');
    // $.ajax({});
  });
});

function defaultDisplay($links){
  $.get('https://news.ycombinator.com/rss', function(data){
    var $xml = $(data);
    function getEachItem(index){
      if( index < 20 ) {
        var $this = $(this),
          obj = {
            title: $this.find('title').text(),
            link: $this.find('link').text(),
            description: $this.find('description').text(),
            pubDate: $this.find('pubDate').text(),
            author: $this.find('author').text()
          };
        var $link = $('<li class="link"/>');
        var $title = $(`<a class="title" href="${obj.link}"/>`);
        $title.text(obj.title).appendTo($link);
        $links.prepend($link);
      }
    }
    $xml.find('item').each(getEachItem);
  });
}
