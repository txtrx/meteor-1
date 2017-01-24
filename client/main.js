import angular from 'angular';
import angularMeteor from 'angular-meteor';
import numbersList from '../imports/components/numbersList/numbersList';
import responseList from '../imports/components/responseList/responseList';
 
angular.module('simple-todos', [
  angularMeteor,
  numbersList.name,
  responseList.name
]);

