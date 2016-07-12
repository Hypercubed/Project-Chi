import angular from 'angular';

const module = angular
  .module('projectX.percentFilter', [])
  .filter('percent', () => {
    return function (input, divided, round) {
      const divider = angular.isString(input) ? Number(input) : input;
      divided = divided || 1;
      round = round || false;

      if (!angular.isNumber(divider) || isNaN(divider)) {
        return input;
      }

      return round ?
        Math.round((divider / divided) * 100) :
        (divider / divided) * 100;
    };
  })
  .filter('percent2', ['$filter', $filter => (input, decimals) => {
    const n = $filter('number')(input * 100, decimals);
    return `${n}%`;
  }]);

export default module.name;
