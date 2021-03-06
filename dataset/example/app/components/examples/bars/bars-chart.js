import d3 from 'd3';
import d3Tip from 'd3-tip';
import 'd3-tip/examples/example-styles.css!';

export default function Bars (opts) {
  opts = opts || {};

  const margin = opts.margin || {top: 20, right: 20, bottom: 30, left: 40};
  let width = 960 - margin.left - margin.right; // 900
  let height = 500 - margin.top - margin.bottom; // 440
  const title = opts.title || 'Bar Chart';

  const formatPercent = d3.format('.0%');

  const xValue = d => d.letter; // data -> value
  const xScale = d3.scale.ordinal(); // value -> display
  const xMap = d => xScale(xValue(d)); // data -> display
  const xAxis = d3.svg.axis().scale(xScale).orient('bottom');

  const yValue = d => d.frequency; // data -> value
  const yScale = d3.scale.linear(); // value -> display
  const yMap = d => yScale(yValue(d)); // data -> display
  const yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(formatPercent);
  const yAxisLabel = 'Frequency';

  const percentFormat = d3.format('.3%');

  const tip = d3Tip()
    .attr('class', 'd3-tip animate')
    .offset([-10, 0])
    .html(d => `Letter: ${d.letter}<br />Frequency: ${percentFormat(d.frequency)}`);

  function bars (selection) {
    selection.each(function (d) {
      const el = d3.select(this);
      tip.rootElement(this.parentNode);

      xScale.rangeRoundBands([0, width], 0.1);
      yScale.range([height, 0]);

      el.selectAll('svg').remove();

      const svg = el.append('svg')
        .attr('class', 'bar-chart-svg')
        .attr('title', title)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      svg.call(tip);

      xScale.domain(d.map(xValue));
      yScale.domain([0, d3.max(d, yValue)]);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text(yAxisLabel);

      svg.selectAll('.bar')
        .data(d)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', xMap)
        .attr('width', xScale.rangeBand)
        .attr('y', yMap)
        .attr('height', d => height - yMap(d))
        .on('mouseover', function (d) {
          tip.show(d, this);
        })
        .on('mouseout', tip.hide);
    });
  }

  bars.width = function (_) {
    if (arguments.length < 1) {
      return width;
    }
    width = _;
    return bars;
  };

  bars.height = function (_) {
    if (arguments.length < 1) {
      return height;
    }
    if (_ === 'auto') {
      _ = 440 / 900 * width;
    }
    height = _;
    return bars;
  };

  return bars;
}
