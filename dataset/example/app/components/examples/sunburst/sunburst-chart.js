import d3 from 'd3';

export default function Sun () {

  function sun (div, data) {
    console.log('data', data);

    const width = div.offsetWidth;
    const height = div.offsetHeight;
    const radius = Math.min(width, height) / 2;
    const color = d3.scale.ordinal().range(['#330136', '#5e1742', '#962e40', '#c9463d', '#ff5e35']);
    // const formatPercent = d3.format('.0%');
    const x = d3.scale.linear().range([0, 2 * Math.PI]);
    const y = d3.scale.linear().range([0, radius]);

    const layout = d3.layout.partition()
      .value(d => d.data.$area);

    const svg = d3.select(div).append('svg')
      .attr('title', 'sunburst')
      .attr('width', width)
      .attr('height', height);

    // group for visual elements
    const visual = svg.append('g').datum(data)
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .classed('visual', true);

    // visual elements
    visual.selectAll('path')
    .data(layout.nodes)
    .enter().append('path')
    .attr('class', (d, i) => 'v' + i)
    .attr('display', d => d.depth ? null : 'none') // hide inner ring
    .attr('d', d => arc(d))
    .style('stroke', '#fff')
    .style('fill', d => color((d.children ? d : d.parent).name))
    .style('fill-rule', 'evenodd');
    // .on('mouseover', function(d){ tip('show',d); })
    // .on('mousemove', function(d) { tip('move'); })
    // .on('mouseout', function(d){ tip('hide'); })

    // Arc calculation
    function arc (d, edge) {
      // visual
      let a = x(d.x);
      let b = x(d.x + d.dx);
      const ir = y(d.y);
      let or = y(d.y + d.dy);

      if (edge === 'middle') { // label guide
        or = y(d.y + (d.dy / 2));
        // add marges angle = pi-2*acos(marge/radius)
        const m = Math.PI - (2 * Math.acos(2 / ir));
        // verify a < b or path=0;
        if (a + m < b - m) {
          a += m;
          b -= b;
        } else {
          b = a;
        }
      } else if (edge === 'extern') { // HL
        or = radius;
      }

      // compute path
      const path = d3.svg.arc()
        .startAngle(Math.max(0, Math.min(2 * Math.PI, a)))
        .endAngle(Math.max(0, Math.min(2 * Math.PI, b)))
        .innerRadius(Math.max(0, ir))
        .outerRadius(Math.max(0, or));

      let res;
      if (edge === 'middle') { // extract outer arc
        const extract = /[Mm][\d\.\-e,\s]+A[\d\.\-e,\s]+/;
        const guide = extract.exec(path(d));
        if (guide) {
          res = guide[0];
        } else {
          res = 'M0,0A0,0Z';
        }
      } else {
        res = path(d);
      }

      return res;
    }
  } // end sun
  return sun;
}
