require('./bars.css!');

function type(d) {
  d.frequency = +d.frequency;
  return d;
}

function Bars(opts) {
  opts = opts || {};

  var margin = opts.margin || {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    title = opts.title || 'Bar Chart';

  var formatPercent = d3.format('.0%');

  var xValue = function(d) { return d.letter; }, // data -> value
    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient('bottom');

  var yValue = function(d) { return d.frequency; }, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(formatPercent);

  function bars(selection) {
    selection.each(function(d, i) {

      var el = d3.select(this);

      el.selectAll('svg').remove();

      var svg = el.append('svg')
        .attr('title', title)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      xScale.domain(d.map(xValue));
      yScale.domain([0, d3.max(d, yValue)]);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Frequency');

      svg.selectAll('.bar')
        .data(d)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', xMap)
        .attr('width', xScale.rangeBand)
        .attr('y', yMap)
        .attr('height', function(d) { return height - yMap(d); });

    });
  }

  return bars;

}

module.exports = Bars;
