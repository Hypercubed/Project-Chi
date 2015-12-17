import d3 from 'd3';

import ChiasmComponent from 'chiasm-component';
import Model from 'model';

// This is an example Chaism plugin that uses D3 to make a bar chart.
// Draws from this Bar Chart example http://bl.ocks.org/mbostock/3885304
export default function BarChart () {
  var my = ChiasmComponent({

    margin: {
      left: 30,
      top: 30,
      right: 30,
      bottom: 30
    },

    barSizeColumn: Model.None,

    // These properties adjust spacing between bars.
    // The names correspond to the arguments passed to
    // d3.scale.ordinal.rangeRoundBands(interval[, padding[, outerPadding]])
    // https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeRoundBands
    barPadding: 0.1,
    barOuterPadding: 0.1,

    fill: 'black',
    stroke: 'none',
    strokeWidth: '1px',

    orientation: 'vertical'

  });

  var barSizeScale = d3.scale.linear();
  var barIdentityScale = d3.scale.ordinal();

  // my.el = document.createElement('div');
  var svg = d3.select(my.initSVG());
  var g = svg.append('g');

  // Respond to changes in size and margin.
  // Inspired by D3 margin convention from http://bl.ocks.org/mbostock/3019563
  my.when(['box', 'margin'], function (box, margin) {
    my.innerBox = {
      width: box.width - margin.left - margin.right,
      height: box.height - margin.top - margin.bottom
    };

    svg
      .attr('width', box.width)
      .attr('height', box.height);

    g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  });

  my.when(['data', 'barSizeColumn', 'innerBox', 'barPadding', 'barOuterPadding', 'fill', 'stroke', 'strokeWidth', 'orientation'], function (data, barSizeColumn, innerBox, barPadding, barOuterPadding, fill, stroke, strokeWidth, orientation) {
    var x, y, width, height;

    barSizeScale
      .domain([0, d3.max(data, function (d) { return d[barSizeColumn]; })]);

    barIdentityScale
      .domain(d3.range(data.length));

    if (orientation === 'vertical') {
      barSizeScale.range([innerBox.height, 0]);
      barIdentityScale.rangeRoundBands([0, innerBox.width], barPadding, barOuterPadding);

      x = function (d, i) { return barIdentityScale(i); };
      y = function (d) { return barSizeScale(d[barSizeColumn]); };
      width = barIdentityScale.rangeBand();
      height = function (d) { return innerBox.height - y(d); };
    } else if (orientation === 'horizontal') {
      barSizeScale.range([0, innerBox.width]);
      barIdentityScale.rangeRoundBands([0, innerBox.height], barPadding, barOuterPadding);

      x = 0;
      y = function (d, i) { return barIdentityScale(i); };
      width = function (d) { return barSizeScale(d[barSizeColumn]); };
      height = barIdentityScale.rangeBand();
    }

    var bars = g.selectAll('rect').data(data);
    bars.enter().append('rect');
    bars
      .attr('x', x)
      .attr('width', width)
      .attr('y', y)
      .attr('height', height)
      .attr('fill', fill)
      .attr('stroke', stroke)
      .attr('stroke-width', strokeWidth);
    bars.exit().remove();
  });

  return my;
}
