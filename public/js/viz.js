// Dependencies: d3.v3, underscore

function VIZ() {

  // VARIABLES

  var xAxis = 'Hour', yAxis = 'Tempo';
  var xAxisOptions = ["Hour", "Weekday", "Month"];
  var yAxisOptions = ["Tempo", "Tonality"];
  var descriptions = {
    "Hour": "Hour of the day",
    "Weekday": "Day of the week",
    "Month": "Month of the year",
    "Tempo": "Average tempo, in BPM",
    "Tonality": "Tonality of the song (main key)",
    "Mode": "Minor or major",
    "Tweet": "Tweet contents"
  };

  var bounds;
  var data = [];
  var pointColour = d3.scale.category10();

  // CREATE ELEMENTS

  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 640);
  var xScale, yScale;
  var displayingText = false;

  svg.append('g')
    .classed('chart', true)
    .attr('transform', 'translate(80, -60)');

  // Build menus
  d3.select('#x-axis-menu')
    .selectAll('li')
    .data(xAxisOptions)
    .enter()
    .append('li')
    .classed('item', true)
    .text(function(d) {return d;})
    .on('click', function(d) {
      xAxis = d;
      updateMenus();
      updateChart();
    });

  d3.select('#y-axis-menu')
    .selectAll('li')
    .data(yAxisOptions)
    .enter()
    .append('li')
    .classed('item', true)
    .text(function(d) {return d;})
    .on('click', function(d) {
      yAxis = d;
      updateMenus();
      updateChart();
    });

  updateMenus();

  d3.select('svg g.chart')
    .append('text')
    .attr({'id': 'countryLabel', 'x': 0, 'y': 170, 'dy': "1.5em"})
    .style({'font-size': '40px', 'font-weight': 'light', 'fill': '#ddd'});

  d3.select('svg g.chart')
    .append('text')
    .attr({'id': 'twitterUser', 'x': 0, 'y': 170, 'dy': 0})
    .style({'font-size': '80px', 'font-weight': 'bold', 'fill': '#ddd'});

  // Axis labels
  d3.select('svg g.chart')
    .append('text')
    .attr({'id': 'xLabel', 'x': 400, 'y': 670, 'text-anchor': 'middle'})
    .text(descriptions[xAxis]);

  d3.select('svg g.chart')
    .append('text')
    .attr('transform', 'translate(-60, 330)rotate(-90)')
    .attr({'id': 'yLabel', 'text-anchor': 'middle'})
    .text(descriptions[yAxis]);

  // Render axes
  d3.select('svg g.chart')
    .append("g")
    .attr('transform', 'translate(0, 630)')
    .attr('id', 'xAxis');

  d3.select('svg g.chart')
    .append("g")
    .attr('id', 'yAxis')
    .attr('transform', 'translate(-10, 0)');

  //// RENDERING FUNCTIONS

  function updateChartNew() {
    if (data.length < 2) return;
    bounds = getBounds(data, 1);
    updateScales();

    // Check updates
    var newElements = d3.select('svg g.chart')
      .selectAll('circle')
      .data(data, function(d) { return d.Tweet; });

    // Update
    newElements.transition().attr('r', function(d) {
        return isNaN(xScale(d[xAxis])) || isNaN(yScale(d[yAxis])) ?
          0 : 5 + Math.exp(-data.length/20+3);
      });

    // Add new elements
    var circles = newElements.enter().append('circle');

    circles.attr('cx', function(d) {
        return isNaN(xScale(d[xAxis])) ?
          d3.select(this).attr('cx') : xScale(d[xAxis]);
      })
      .attr('cy', function(d) {
        return isNaN(yScale(d[yAxis])) ?
           d3.select(this).attr('cy') : yScale(d[yAxis]);
      })
      .attr('r', function(d) {
        return isNaN(xScale(d[xAxis])) || isNaN(yScale(d[yAxis])) ?
          0 : 5 + Math.exp(-data.length/20+3);
      })
      .attr('fill', function(d) {
        return d['Mode'] == 'major' ? pointColour(1) : pointColour(2);
      })
      .attr({'stroke': 'none', 'stroke-width': 3})
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .transition()
      .style('opacity', function() { return displayingText ? 0.1 : 1; });

    // Bind mouse to new elements
    circles.on('mouseover', function(d) {
      displayingText = true;
      d3.select('svg g.chart #countryLabel')
        .text(d.Tweet)
        .call(wrap, 700)
        .transition()
        .style('opacity', 1);
      d3.select('svg g.chart #twitterUser')
        .text(d.User)
        .transition()
        .style('opacity', 1);
      d3.select('svg g.chart')
        .selectAll('circle')
        .transition()
        .style('opacity', function(dd) { return dd == d ? 1 : 0.1; });
    })

    circles.on('mouseout', function(d) {
      displayingText = false;
      d3.select('svg g.chart #countryLabel')
        .transition()
        .duration(1500)
        .style('opacity', 0);
      d3.select('svg g.chart #twitterUser')
        .transition()
        .duration(1500)
        .style('opacity', 0);
      d3.select('svg g.chart')
        .selectAll('circle')
        .transition()
        .duration(1500)
        .style('opacity', 1);
    })

    circles.on('click', function(d) {
      d3.select('svg g.chart')
        .selectAll('circle')
        .attr('stroke', function(x) {
          return x == d ? 'black' : 'none';
        })
      d3.select('#player-frame')
        .attr('src', 'http://toma.hk/embed.php?'+
                     'artist='+encodeURIComponent(d.Artist)+
                     '&title='+encodeURIComponent(d.Song)+
                     '&autoplay=true')
    })

    // Exit removed elements
    newElements.exit()
      .transition()
      .style('opacity', 0)
      .remove();

    updateMenus();

    // Also update the axes
    d3.select('#xAxis')
      .transition()
      .call(makeXAxis);

    d3.select('#yAxis')
      .transition()
      .call(makeYAxis);
  }

  function updateChart() {
    updateScales();

    d3.select('svg g.chart')
      .selectAll('circle')
      .transition()
      .duration(500)
      .ease('quad-out')
      .attr('cx', function(d) {
        return isNaN(xScale(d[xAxis])) ?
          d3.select(this).attr('cx') : xScale(d[xAxis]);
      })
      .attr('cy', function(d) {
        return isNaN(yScale(d[yAxis])) ?
          d3.select(this).attr('cy') : yScale(d[yAxis]);
      })
      .attr('r', function(d) {
        return isNaN(xScale(d[xAxis])) || isNaN(yScale(d[yAxis])) ?
          0 : 5 + Math.exp(-data.length/20+3);
      });

    // Also update the axes
    d3.select('#xAxis').transition().call(makeXAxis);
    d3.select('#yAxis').transition().call(makeYAxis);

    // Update axis labels
    d3.select('#xLabel').text(descriptions[xAxis]);
    d3.select('#yLabel').text(descriptions[yAxis]);
  }

  function updateScales() {
    if (xAxis == 'Weekday') {
      xScale = d3.scale.ordinal()
          .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
          .rangePoints([20, 780], 1)
    } else if (xAxis == 'Month') {
      xScale = d3.scale.ordinal()
          .domain(['Jan','Feb','Mar','Apr','May','Jun',
                   'Jul','Aug','Sep','Oct','Nov','Dec'])
          .rangePoints([20, 780], 1)
    } else {
      xScale = d3.scale.linear()
          .domain([bounds[xAxis].min, bounds[xAxis].max])
          .range([20, 780]);
    }

    if (yAxis == 'Tonality') {
      yScale = d3.scale.ordinal()
          .domain(['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'])
          .rangePoints([600, 100], 1)
    } else {
      yScale = d3.scale.linear()
          .domain([bounds[yAxis].min, bounds[yAxis].max])
          .range([600, 100]);
    }
  }

  function makeXAxis(s) {
    s.call(d3.svg.axis()
      .scale(xScale)
      .orient("bottom"))
  }

  function makeYAxis(s) {
    s.call(d3.svg.axis()
      .scale(yScale)
      .orient("left"))
  }

  function updateMenus() {
    d3.select('#x-axis-menu')
      .selectAll('li')
      .classed('selected', function(d) {
        return d === xAxis;
      });
    d3.select('#y-axis-menu')
      .selectAll('li')
      .classed('selected', function(d) {
        return d === yAxis;
    });
  }

  // expose interface

  this.addToChart = function(point) {
    data.push(point);
    // if (NAX_POINTS && data.length > MAX_POINTS) data.shift();
    updateChartNew();
  };

  this.clear = function() {
    data.length = 2;
    updateChartNew();
  }

}

// GENERIC HELPER FUNCTIONS

function getBounds(d, paddingFactor) {
  // Find min and maxes (for the scales)
  paddingFactor = typeof paddingFactor !== 'undefined' ? paddingFactor : 1;

  var keys = _.keys(d[0]), b = {};
  _.each(keys, function(k) {
    b[k] = {};
    _.each(d, function(d) {
      if(isNaN(d[k]) || +d[k] !== d[k])
        return;
      if(b[k].min === undefined || d[k] < b[k].min)
        b[k].min = d[k];
      if(b[k].max === undefined || d[k] > b[k].max)
        b[k].max = d[k];
    });
    b[k].max > 0 ? b[k].max *= paddingFactor : b[k].max /= paddingFactor;
    b[k].min > 0 ? b[k].min /= paddingFactor : b[k].min *= paddingFactor;
  });
  return b;
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr({x:0,y:y,dy:dy+"em"});
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr({
          x: 0, y: y,
          dy: ++lineNumber * lineHeight + dy + "em"})
        .text(word);
      }
    }
  });
}

