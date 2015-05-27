'use strict';

import app from 'components/app';

class AboutCtrl{
  constructor(){
    this.value = 0;
    //console.log('about!');
  }
}

app
  .controller('AboutCtrl', AboutCtrl);
