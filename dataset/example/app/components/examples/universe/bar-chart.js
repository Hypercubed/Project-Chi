import d3 from 'd3';
import './universe.css!';

// from https://github.com/square/crossfilter/blob/gh-pages/index.html
export default function barChart () {
  if (!barChart.id) {
    barChart.id = 0;
  }

  let margin = {top: 20, right: 10, bottom: 20, left: 10};
  let x = d3.scale.linear();
  let y = d3.scale.linear();
  const id = barChart.id++;
  const axis = d3.svg.axis().orient('bottom');
  const brush = d3.svg.brush();
  let brushDirty = null;
  let round = null;
  let width = 500;
  let height = 100;
  let title = '';

  let query = null;

  function chart (selection) {
    selection.each(function (_query) {
      query = _query;
      const data = query.data;

      y
        .range([height, 0])
        .domain(d3.extent(data, d => d.value.count));

      const xe = d3.extent(data, d => d.key);
      const del = data[1].key - data[0].key;

      xe[1] += del;

      x
        .domain(xe)
        .rangeRound([0, width]);

      axis.scale(x);
      brush.x(x);

      const div = d3.select(this);
      let g = div.select('g');

      // Create the skeletal chart.
      if (g.empty()) {
        const svg = div.append('svg')
            .attr('title', title)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        svg
          .append('text')
          .attr('class', 'title')
          .attr('text-anchor', 'middle')
          .attr('transform', `translate(${width / 2},${margin.top / 2})`)
          .text(title);

        g = svg
          .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        g.append('clipPath')
            .attr('id', `clip-${id}`)
          .append('rect')
            .attr('width', width)
            .attr('height', height);
        g.selectAll('.bar')
            .data(['background', 'foreground'])
          .enter().append('path')
            .attr('class', d => `${d} bar`)
            .datum(query.data, d => d.key);
        g.selectAll('.foreground.bar')
            .attr('clip-path', `url(#clip-${id})`);
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${height})`)
            .call(axis);
        // Initialize the brush component with pretty resize handles.
        const gBrush = g.append('g').attr('class', 'brush').call(brush);
        gBrush.selectAll('rect').attr('height', height);
        gBrush.selectAll('.resize').append('path').attr('d', resizePath);
      }
      // Only redraw the brush if set externally.
      if (brushDirty) {
        brushDirty = false;
        g.selectAll('.brush').call(brush);
        div.select('.title button').style('display', brush.empty() ? 'none' : null);
        if (brush.empty()) {
          g.selectAll(`#clip-${id} rect`)
              .attr('x', 0)
              .attr('width', width);
        } else {
          const extent = brush.extent();
          g.selectAll(`#clip-${id} rect`)
              .attr('x', x(extent[0]))
              .attr('width', x(extent[1]) - x(extent[0]));
        }
      }
      g.selectAll('.bar').attr('d', barPath);
    });

    function barPath (groups) {
      const path = [];
      let i = -1;
      const n = groups.length;
      let d = null;
      const w = x(groups[1].key) - x(groups[0].key) - 2;
      while (++i < n) {
        d = groups[i];
        path.push('M', x(d.key) + 1, ',', height, 'V', y(d.value.count), 'h', w, 'V', height);
      }
      return path.join('');
    }

    function resizePath (d) {
      const e = Number(d === 'e');
      const x = e ? 1 : -1;
      const y = height / 3;
      /* eslint-disable prefer-template, operator-linebreak, no-mixed-operators */
      return 'M' + (0.5 * x) + ',' + y
          + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
          + 'V' + (2 * y - 6)
          + 'A6,6 0 0 ' + e + ' ' + (0.5 * x) + ',' + (2 * y)
          + 'Z'
          + 'M' + (2.5 * x) + ',' + (y + 8)
          + 'V' + (2 * y - 8)
          + 'M' + (4.5 * x) + ',' + (y + 8)
          + 'V' + (2 * y - 8);
      /* eslint-enable */
    }
  }

  brush.on('brushstart.chart', function () {
    const div = d3.select(this.parentNode.parentNode.parentNode);
    div.select('.title button').style('display', null);
  });

  brush.on('brush.chart', function () {
    const g = d3.select(this.parentNode);
    let extent = brush.extent();
    if (round) {
      g.select('.brush')
        .call(brush.extent(extent = extent.map(round)))
      .selectAll('.resize')
        .style('display', null);
    }
    g.select(`#clip-${id} rect`)
        .attr('x', x(extent[0]))
        .attr('width', x(extent[1]) - x(extent[0]));
    query.universe.filter(query.column.key, extent, true, true);
  });

  brush.on('brushend.chart', function () {
    if (brush.empty()) {
      const div = d3.select(this.parentNode.parentNode.parentNode);
      div.select('.title button').style('display', 'none');
      div.select(`#clip-${id} rect`).attr('x', null).attr('width', '100%');
      query.universe.filter(query.column.key, null, true, true);
    }
  });

  chart.margin = function (_) {
    if (!arguments.length) {
      return margin;
    }
    margin = _;
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) {
      return width;
    }
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) {
      return height;
    }
    height = _;
    return chart;
  };

  chart.title = function (_) {
    if (!arguments.length) {
      return title;
    }
    title = _;
    return chart;
  };

  chart.x = function (_) {
    if (!arguments.length) {
      return x;
    }
    x = _;
    axis.scale(x);
    brush.x(x);
    return chart;
  };

  chart.y = function (_) {
    if (!arguments.length) {
      return y;
    }
    y = _;
    return chart;
  };

  chart.filter = function (_) {
    if (_) {
      brush.extent(_);
      query.universe.filter(query.column.key, _, true, true);
    } else {
      brush.clear();
      query.universe.filter(query.column.key, null, true, true);
    }
    brushDirty = true;
    return chart;
  };

  chart.clearBrush = function () {
    brush.clear();
    brushDirty = true;
    return chart;
  };

  chart.round = function (_) {
    if (!arguments.length) {
      return round;
    }
    round = _;
    return chart;
  };

  return d3.rebind(chart, brush, 'on');
}
