function finances() {
  clearContent();
  putTitle('Personal Financial Data');

  var dataset = [];

  var width = 1200;
  var height = 300;
  var barPadding = 2;

  $('tr').each(function(i) {

    dataset.push({
      date: $(this).children().eq(0).text(), // dd/mm/yyyy
      concept: $(this).children().eq(1).text().toString().split('\n')[0],
      amount: $(this).children().eq(2).text().toString().split(',')[0].split('.').join('') // $1.234,00
    });

  });

  var scale = d3.scale.linear()
                  .domain([0, d3.max(dataset, function(d) { return d.amount} )])
                  .range([200, 0]);

  var color = d3.scale.quantize()
              .domain([0, d3.max(dataset, function(d) { return d.amount} ) / 2, d3.max(dataset, function(d) { return d.amount} )])
              .range(["#FF5335", "#FFD300", "#80EF91"]);

  var svgContainer = d3.select("#ej-ctn").append("svg")
                                           .attr("width", width)
                                           .attr("height", height);


    svgContainer.selectAll('expense')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("fill", function(d) { return color(d.amount); })
                .attr("x", function(d, i) {return i * (width / dataset.length); })
                .attr("y", function(d) { return height - scale(d.amount); })
                .style("display", "inline-block")
                .transition()
                .duration(300)
                .attr("width", width / dataset.length - barPadding)
                .style("height", function(d) { return scale(d.amount)});



};

