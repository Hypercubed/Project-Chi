/* global Polymer */

import 'polymer/polymer.html!';
import d3 from 'd3';

// has to be relative to root absolute, ugh
import Bars from 'components/examples/bars/bars-chart';

Polymer({
  is: 'bar-chart',

  properties: {
    barData: {
      Type: String,
      notify: true
    },
    data: {
      computed: 'parse(barData)'
    }
  },

  attached () {
    this.resized = this.draw.bind(this);
    window.addEventListener('resize', this.resized);
  },

  detached () {
    window.removeEventListener('resize', this.resized);
  },

  observers: [
    'dataChanged(data)'
  ],

  created () {
    this.bars = new Bars(this);
  },

  parse: x => JSON.parse(x),

  dataChanged () {
    this.draw();
  },

  draw () {
    if (!this.data || !this.elem) {
      return;
    }

    const width = this.clientWidth - 80;

    d3.select(this.elem)
      .datum(this.data).call(this.bars.width(width).height('auto'));
  },

  ready () {
    this.elem = this.$.chart;
    this.draw();
  }
});
