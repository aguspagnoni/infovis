function finances() {
  clearContent();
  putTitle('Personal Financial Data');

  var dataset = [];

  $('tr').each(function(i) {

    dataset.push({
      date: $(this).children().eq(0).text(), // dd/mm/yyyy
      concept: $(this).children().eq(1).text().toString().split('\n')[0],
      amount: $(this).children().eq(2).text().toString().split(',')[0].split('.').join('') // $1.234,00
    });

  });

  var amounts = dataset.map(function(d) {return d.amount});
  var scale = d3.scale.linear()
                  .domain([0, 5000])
                  .range([100, 0]);


  var svgContainer = d3.select("#ej-ctn").append("svg")
                                           .attr("width", 800)
                                           .attr("height", 600);


    svgContainer.selectAll('expense')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("fill", "#80EF91")
                .attr("x", function(d, i) { return 5 + i*20})
                .attr("y", 20)
                .style("display", "inline-block")
                .style("width", '10px')
                .style("height", function(d) { return scale(d.amount) + 'px' });



};

