import angular from 'angular';
import angularMeteor from 'angular-meteor';
import numbersList from '../imports/components/numbersList/numbersList';
 
angular.module('simple-todos', [
  angularMeteor,
  numbersList.name
]);