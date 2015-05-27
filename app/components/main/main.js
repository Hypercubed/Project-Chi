'use strict';

import 'components/main/main.css!';

import app from 'components/app';

let clicks = { value: 0 };

class MainCtrl {
  /*@ngInject*/
  constructor(){
    this.clicks = clicks;
  }
}

app
  .controller('MainCtrl', MainCtrl);
