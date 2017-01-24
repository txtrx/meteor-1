import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Numbers } from '../../api/numbers.js';
import { Groups } from '../../api/numbers.js';
import { Responses } from '../../api/numbers.js';

import template from './responseList.html';
 
class ResponseCtrl {
 constructor($scope) {
    $scope.viewModel(this);
    this.$scope=$scope;

    this.helpers({
      responses() {
        return Responses.find({});
      }

    })
  }

 
 

  setChecked(response) {
    // Set the checked property to the opposite of its current value
    Responses.update(response._id, {
      $set: {
        checked: !response.checked
      },
    });
  }


}


 
export default angular.module('responsesList', [
  angularMeteor
])
  .component('responsessList', {
    templateUrl: 'imports/components/responseList/responseList.html',
    controller: ['$scope', ResponseCtrl]
  });