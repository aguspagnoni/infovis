
  function ej1() {
    var v = [['data', 10], ['information', 9], ['visualization', 8], ['abstract', 7], ['visual', 6], ['space', 5], ['computer', 4], ['cognition', 3], ['representations', 2], ['can', 1]];
    var scale = d3.scale.sqrt()
                  .domain([1, 10])
                  .range([10, 70]);
    var colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo','violet'];
    clearContent();
    putTitle('Word Cloud');

    d3.shuffle(v);
    d3.select("div#ej-ctn")
      .selectAll("whatever")
      .data(v)
      .enter()
      .append("span")
      .attr("style", function(d) {
         var num = Math.floor(Math.random() * colors.length);
         return "font-size: " + scale(d[1]) + "px; " +  "color: " + colors[num];
      })
      .text(function (d,i) { return d[0]+ " "; });
  }
