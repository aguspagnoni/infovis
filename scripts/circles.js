  // Credits for Noelia Lopez, code taken from her repo.
// Interesting way of using D3 selection groups to sort of "concat" in a line all 4 elements created
function ej3() {
  clearContent();
  putTitle('Bar Chart using SVG and D3');

  var width = 400;
  var height = 400;

  var dataset = [
    {
      area: 10,
      x: width*0.25,
      y: height*0.25,
      color: 'red'
    },
    {
      area: 100,
      x: width*0.75,
      y: height*0.25,
      color: 'blue'
    }
  ]



  var svgContainer = d3.select("#ej-ctn").append("svg")
                                           .attr("width", width)
                                           .attr("height", height);


    svgContainer.selectAll('circlee')
                .data(dataset)
                .enter()
                .append('circle')
                .attr("fill", function(d) { return d.color; })
                .attr("r", function(d) { return Math.sqrt(d.area) * 10; })
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

};

