/* global d3 */

// from http://bl.ocks.org/mbostock/5544621
// https://gist.github.com/mbostock/5544621

module.exports = function Chart (opts) {
  opts = opts || {};

  return function chart (selection) {
    selection.each(function (d, i) {
      var el = d3.select(this);

      el.selectAll('svg').remove();

      var stations = []; // lazily loaded

      var formatTime = d3.time.format('%I:%M%p');

      var margin = {top: 20, right: 30, bottom: 20, left: 100};
      var width = 960 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;

      var x = d3.time.scale()
      .domain([parseTime('5:30AM'), parseTime('11:30AM')])
      .range([0, width]);

      var y = d3.scale.linear()
      .range([0, height]);

      var z = d3.scale.linear()
        .domain([0.0001, 0.0003])
        .range(['purple', 'orange'])
        .interpolate(d3.interpolateLab);

      var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(8)
        .tickFormat(formatTime);

      var svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      svg.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('y', -margin.top)
        .attr('width', width)
        .attr('height', height + margin.top + margin.bottom);

      var trains = d.map(type);

      y.domain(d3.extent(stations, function (d) { return d.distance; }));

      var station = svg.append('g')
        .attr('class', 'station')
        .selectAll('g')
        .data(stations)
        .enter().append('g')
        .attr('transform', function (d) { return 'translate(0,' + y(d.distance) + ')'; });

      station.append('text')
        .attr('x', -6)
        .attr('dy', '.35em')
        .text(function (d) { return d.name; });

      station.append('line')
        .attr('x2', width);

      svg.append('g')
        .attr('class', 'x top axis')
        .call(xAxis.orient('top'));

      svg.append('g')
        .attr('class', 'x bottom axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis.orient('bottom'));

      var train = svg.append('g')
        .attr('class', 'train')
        .attr('clip-path', 'url(#clip)')
        .selectAll('g')
        .data(trains.filter(function (d) { return /[NLB]/.test(d.type); }))
        .enter().append('g')
        .attr('class', function (d) { return d.type; });

      train.selectAll('line')
        .data(function (d) {
          return d.stops.slice(1).map(function (b, i) {
            return [d.stops[i], b];
          });
        })
        .enter().append('line')
        .attr('x1', function (d) { return x(d[0].time); })
        .attr('x2', function (d) { return x(d[1].time); })
        .attr('y1', function (d) { return y(d[0].station.distance); })
        .attr('y2', function (d) { return y(d[1].station.distance); })
        .style('stroke', function (d) { return z(Math.abs((d[1].station.distance - d[0].station.distance) / (d[1].time - d[0].time))); });

      train.selectAll('circle')
      .data(function (d) { return d.stops; })
      .enter().append('circle')
      .attr('transform', function (d) { return 'translate(' + x(d.time) + ',' + y(d.station.distance) + ')'; })
      .attr('r', 2);

      function type (d, i) {
        // Extract the stations from the 'stop|*' columns.
        if (!i) {
          for (var k in d) {
            if (/^stop\|/.test(k)) {
              var p = k.split('|');
              stations.push({
                key: k,
                name: p[1],
                distance: +p[2],
                zone: +p[3]
              });
            }
          }
        }

        return {
          number: d.number,
          type: d.type,
          direction: d.direction,
          stops: stations
          .map(function (s) { return {station: s, time: parseTime(d[s.key])}; })
          .filter(function (s) { return s.time != null; })
        };
      }

      function parseTime (s) {
        var t = formatTime.parse(s);
        if (t != null && t.getHours() < 3) t.setDate(t.getDate() + 1);
        return t;
      }
    });
  };
};
