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
    width: Number,
    height: {
      type: Number,
      value: 400
    },
    data: {
      computed: 'parse(barData)'
    }
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

    d3.select(this.elem)
      .datum(this.data).call(this.bars);
  },

  ready () {
    this.elem = this.$.chart;
    this.draw();
  }
});
