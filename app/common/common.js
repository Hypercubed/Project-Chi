import angular from 'angular';

import dataServices from 'common/services/datapackage/index';
import dataPackageEditor from 'common/components/editor/editor';

import loadingBar from 'common/services/loading-bar/loading-bar';
import dynamicTitle from 'common/services/dynamic-title/dynamic-title';
import growl from 'common/services/growl/growl';

import onResize from 'common/directives/resize';
import activePath from 'common/directives/active-path';

const common = angular
  .module('projectX.common', [
    dataServices,
    dataPackageEditor,
    onResize,
    loadingBar,
    dynamicTitle,
    growl,
    activePath
  ]);

export default common.name;
