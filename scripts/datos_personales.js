function finances() {
  clearContent();
  putTitle('Personal Financial Data');

  var dataset = [];

  var width = 1200;
  var height = 1000;
  var barPadding = 2;

  $('tr').each(function(i) {

    dataset.push({
      date: $(this).children().eq(0).text(), // dd/mm/yyyy
      concept: parseConcept($(this)),
      amount: $(this).children().eq(2).text().toString().split(',')[0].split('.').join(''), // $1.234,00
      income: $(this).children().eq(3).text().toString().split(',')[0].split('.').join('') // $1.234,00
    });

  });

  var incomes = {};
  var spent = {};

  dataset.forEach(function(d) {
    if (d.income > 0) {
      bef = incomes[d.concept];
      incomes[d.concept] = (bef || 0) + parseInt(net(d));
    } else {
      bef = spent[d.concept];
      spent[d.concept] = (bef || 0) + parseInt(net(d));
    }
  });

  incomes = hashToArray(incomes);
  spent = hashToArray(spent);


// Define the div for the tooltip
  var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

  var scale = d3.scale.linear()
                  .domain([1, maxOfArray(dataset.map(function(d) { return d.amount || d.income } )) / 4])
                  .range([0, 500]);

  var color = d3.scale.quantile()
              .domain([0, 10, 50, 100, 1000, 5000, 10000, 15000])
              .range(["#80EF91", "#92D883", "#A4C276", "#B6AC69", "#C8955C", "#DA7F4F", "#EC6942", "#FF5335"]);

  var svgContainer = d3.select("#ej-ctn").append("svg")
                                           .attr("width", width)
                                           .attr("height", height);


  svgContainer.selectAll("gilada")
              .data(spent)
              .enter()
              .append('circle')
              .attr("fill", function(d) { return color(d.value) })
              .attr("r", function(d) { return Math.sqrt(d.value); })
              .attr("cx", function(d) { return Math.floor(Math.random() * width); })
              .attr("cy", function(d) { return Math.floor(Math.random() * height); })
              .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html(d.concept + "<hr/>"  + "$ " + d.value)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
              .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
              });
              // .append("svg:title")
              // .text(function(d) { return d.concept; });
    // svgContainer.selectAll('expense')
    //             .data(dataset)
    //             .enter()
    //             .append('rect')
    //             .attr("fill", function(d) { return color(d.amount); })
    //             .attr("x", function(d, i) {return i * (width / dataset.length); })
    //             .attr("y", function(d) {
    //               if (d.income > 0) {
    //                 return height/2 - scale(d.income);
    //               } else {
    //                 return height/2;
    //               }
    //             })
    //             .style("display", "inline-block")
    //             .transition()
    //             .duration(300)
    //             .attr("width", width / dataset.length - barPadding)
    //             .style("height", function(d) {
    //               return scale(net(d))
    //             })
    //             ;

  function net(d) { return d.amount > 0 ? d.amount : d.income }
  function hashToArray(h) {
    var array = new Array();

    for (var key in h) {
        var asd = {};
        asd["concept"] = key;
        asd["value"] = h[key];
        array.push(asd);
    }
    return array;
  };


  function parseConcept(e) {
    strings = e.children().eq(1)[0].childNodes;
    return (strings[2] || strings[0]).textContent;
  }

  function maxOfArray(array) { return Math.max.apply(null, array) }

};
