  // Credits for Noelia Lopez, code taken from her repo.
// Interesting way of using D3 selection groups to sort of "concat" in a line all 4 elements created
function ej2() {
  clearContent();
  putTitle('Bar Chart using SVG and D3');

  var dataset = [
    {
      text: 'I felt creative',
      agree: 88,
      neutral: 8,
      disagree: 4
    },
    {
      text: 'I felt an emotional reaction',
      agree: 66,
      neutral: 22,
      disagree: 12
    },
    {
      text: 'I learned something new about the text',
      agree: 63,
      neutral: 24,
      disagree: 13
    },
    {
      text: 'It confirmed my understanding of the text',
      agree: 57,
      neutral: 33,
      disagree: 10
    },
    {
      text: 'It jogged my memory',
      agree: 50,
      neutral: 35,
      disagree: 15
    },
    {
      text: 'The Wordle confused me',
      agree: 5,
      neutral: 9,
      disagree: 86
    }
  ]

  var svgContainer = d3.select("#ej-ctn").append("svg")
                                           .attr("width", 400)
                                           .attr("height", 200);

  for (var i = dataset.length - 1; i >= 0; i--) {

    svgContainer.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .text(function(d) { return d.text; })
                .style("font-size", "14px")
                .style("display", "inline-block")
                .style("line-height", "20px")
                .attr("y", function(d,i) { return 18+i*25});

    svgContainer.selectAll('rect1')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("fill", "#80EF91")
                .attr("y", function(d,i) { return i*25})
                .attr("x", "300")
                .style("height", "20px")
                .style("display", "inline-block")
                .style("width", function(d) { return d.agree + 'px'});


    svgContainer.selectAll('rect2')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("fill", "#DFE0D4")
                .attr("y", function(d,i) { return i*25})
                .attr("x", function(d) { return 300+d.agree })
                .style("height", "20px")
                .style("display", "inline-block")
                .style("width", function(d) { return d.neutral + 'px'});

    svgContainer.selectAll('rect3')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("fill", "#FF5335")
                .attr("y", function(d,i) { return i*25})
                .attr("x", function(d) { return 300+d.agree + d.neutral })
                .style("height", "20px")
                .style("display", "inline-block")
                .style("width", function(d) { return d.disagree + 'px'});


  };
};

