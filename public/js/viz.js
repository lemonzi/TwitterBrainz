// Dependencies: d3.v3, underscore

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

function getCorrelation(xArray, yArray) {
  function sum(m, v) {return m + v;}
  function sumSquares(m, v) {return m + v * v;}
  function filterNaN(m, v, i) {isNaN(v) ? null : m.push(i); return m;}

  // clean the data (because we know that some values are missing)
  var xNaN = _.reduce(xArray, filterNaN , []);
  var yNaN = _.reduce(yArray, filterNaN , []);
  var include = _.intersection(xNaN, yNaN);
  var fX = _.map(include, function(d) {return xArray[d];});
  var fY = _.map(include, function(d) {return yArray[d];});

  var sumX = _.reduce(fX, sum, 0);
  var sumY = _.reduce(fY, sum, 0);
  var sumX2 = _.reduce(fX, sumSquares, 0);
  var sumY2 = _.reduce(fY, sumSquares, 0);
  var sumXY = _.reduce(fX, function(m, v, i) {return m + v * fY[i];}, 0);

  var n = fX.length;
  var ntor = ( ( sumXY ) - ( sumX * sumY / n) );
  var dtorX = sumX2 - ( sumX * sumX / n);
  var dtorY = sumY2 - ( sumY * sumY / n);

  var r = ntor / (Math.sqrt( dtorX * dtorY )); // Pearson ( http://www.stat.wmich.edu/s216/book/node122.html )
  var m = ntor / dtorX; // y = mx + b
  var b = ( sumY - m * sumX ) / n;

  return {r: r, m: m, b: b};
}

var addToChart; // to be filled in by init

function init() {

  var xAxis = 'Hour', yAxis = 'Tempo';
  var xAxisOptions = ["Hour", "Weekday", "Month"];
  var yAxisOptions = ["Tempo", "Tonality"];
  var descriptions = {
    "Hour": "Hour of the day",
    "Weekday": "Day of the week",
    "Month": "Month of the year",
    "Tempo": "Average tempo, in BPM",
    "Tonality": "Tonality (C,D,E,F,G,A,B,Eb,C#,...)",
    "Mode": "Minor or major",
    "Tweet": "Tweet contents"
  };

  var bounds;
  var data = [];
  var pointColour = d3.scale.category10();

  // SVG AND D3 STUFF
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

  // Best fit line (to appear behind points)
  d3.select('svg g.chart')
    .append('line')
    .attr('id', 'bestfit');

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
        return isNaN(xScale(d[xAxis])) || isNaN(yScale(d[yAxis])) ? 0 : 5 + Math.exp(-data.length/20+3);
      });

    // Add new elements
    var circles = newElements.enter().append('circle');

    circles.attr('cx', function(d) {
        return isNaN(xScale(d[xAxis])) ? d3.select(this).attr('cx') : xScale(d[xAxis]);
      })
      .attr('cy', function(d) {
        return isNaN(yScale(d[yAxis])) ? d3.select(this).attr('cy') : yScale(d[yAxis]);
      })
      .attr('r', function(d) {
        return isNaN(xScale(d[xAxis])) || isNaN(yScale(d[yAxis])) ? 0 : 5 + Math.exp(-data.length/20+3);
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
      .on('mouseout', function(d) {
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
      .on('click', function(d) {
        d3.select('svg g.chart')
          .selectAll('circle')
          .attr('stroke', function(x) {
            return x == d ? 'black' : 'none';
          })
        d3.select('#player-frame')
          .attr('src', 'https://toma.hk/embed.php?artist='+encodeURIComponent(d.Artist)+'&title='+encodeURIComponent(d.Song)+'&autoplay=true')
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

    // Update correlation
    var xArray = _.map(data, function(d) {return xScale(d[xAxis]);});
    var yArray = _.map(data, function(d) {return yScale(d[yAxis]);});
    var c = getCorrelation(xArray, yArray);
    var x1 = xScale.range()[0], y1 = c.m * x1 + c.b;
    var x2 = xScale.range()[1], y2 = c.m * x2 + c.b;

    // Fade in
    d3.select('#bestfit')
      .style('opacity', 0)
      .attr({'x1': xScale(x1), 'y1': yScale(y1), 'x2': xScale(x2), 'y2': yScale(y2)})
      .transition()
      .duration(1500)
      .style('opacity', 1);

  }

  function updateChart() {
    updateScales();

    d3.select('svg g.chart')
      .selectAll('circle')
      .transition()
      .duration(500)
      .ease('quad-out')
      .attr('cx', function(d) {
        return isNaN(xScale(d[xAxis])) ? d3.select(this).attr('cx') : xScale(d[xAxis]);
      })
      .attr('cy', function(d) {
        return isNaN(yScale(d[yAxis])) ? d3.select(this).attr('cy') : yScale(d[yAxis]);
      })
      .attr('r', function(d) {
        return isNaN(xScale(d[xAxis])) || isNaN(yScale(d[yAxis])) ? 0 : 5 + Math.exp(-data.length/20+3);
      });

    // Also update the axes
    d3.select('#xAxis')
      .transition()
      .call(makeXAxis);

    d3.select('#yAxis')
      .transition()
      .call(makeYAxis);

    // Update axis labels
    d3.select('#xLabel')
      .text(descriptions[xAxis]);

    // Update correlation
    var xArray = _.map(data, function(d) {return xScale(d[xAxis]);});
    var yArray = _.map(data, function(d) {return yScale(d[yAxis]);});
    var c = getCorrelation(xArray, yArray);
    var x1 = xScale.range()[0], y1 = c.m * x1 + c.b;
    var x2 = xScale.range()[1], y2 = c.m * x2 + c.b;

    // Fade in
    d3.select('#bestfit')
      .style('opacity', 0)
      .attr({'x1': xScale(x1), 'y1': yScale(y1), 'x2': xScale(x2), 'y2': yScale(y2)})
      .transition()
      .duration(1500)
      .style('opacity', 1);
  }

  function updateScales() {
    if (xAxis == 'Weekday') {
      xScale = d3.scale.ordinal()
          .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
          .rangePoints([20, 780], 1)
    } else if (xAxis == 'Month') {
      xScale = d3.scale.ordinal()
          .domain(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])
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

  addToChart = function(point) {
    data.push(point);
    if (data.length > 50) data.shift();
    updateChartNew();
  };

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
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

