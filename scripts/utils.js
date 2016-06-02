function clearContent() {
  d3.select("div#ej-ctn").text('')
}

function putTitle(title) {
  d3.select("div#ej-ctn")
      .append('h2')
      .text(title);
}

function loadHtml(file, container) {
  $.get(file, function(data) {
    $(container).html(data);
  })
}
