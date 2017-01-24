import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Numbers } from '../../api/numbers.js';
import { Groups } from '../../api/numbers.js';
import { Responses } from '../../api/numbers.js';
import { Messages } from '../../api/numbers.js';

import template from './numbersList.html';
 
class TodosListCtrl {
 constructor($scope) {
    $scope.viewModel(this);
    $scope.phone = '';
    $scope.first = '';
    $scope.last = '';
    $scope.phonenumber = '';
    $scope.message = '';
    $scope.message2 = '';
    $scope.gname = '';
    $scope.group = '';
    $scope.Show_Home = true;
    this.$scope=$scope;

    this.helpers({
      numbers() {
        return Numbers.find({});
      },
      groups() {
        return Groups.find({});
      },
      responses() {
        return Responses.find({});
      },

    numberCount() {
      return Numbers.find({}).count();
      }

    })
  }

  addNumber(first,last,phone){
    Numbers.insert({
      first_name: first,
      last_name: last,
      number: phone,
      createdAt: new Date()

    });
    this.$scope.phone = '';
    this.$scope.first = '';
    this.$scope.last = '';

  }

  sendText(phonenumber,message){
    console.log(message);
    console.log(phonenumber);
    Meteor.call('sendSMS', '+' + phonenumber, message, function(err,response) {
      if(err) {
        return;
      }
      console.log(response);
    });
    this.$scope.phonenumber = '';
    this.$scope.message = '';

  }

  sendGroupText(message2){
    console.log('grouptext?');
    var checked = Groups.find({ "checked" : true } );
    var numbers = [];
    checked.forEach(function(g){
      for (var i=0; i<g.members.length;i++) 
      {
        console.log(g.members[i]['number']);
        Meteor.call('sendSMS', '+' + g.members[i]['number'], message2, function(err,response) {
        if(err) {
          return;
        }
        console.log(response);
        });
      } 
    });
    this.$scope.message2 = '';

  }

  setChecked(number) {
    // Set the checked property to the opposite of its current value
    Numbers.update(number._id, {
      $set: {
        checked: !number.checked
      },
    });
  }
 
  removeNumber(number) {
    Numbers.remove(number._id);
  }

  createGroup(gname) {
    var checked = Numbers.find({ "checked" : true } );
    var groupmembers = [];
    checked.forEach(function(m){
      groupmembers.push({"fname":m.first_name,"lname":m.last_name,"number":m.number});
    });
    Groups.insert({name:gname,members:groupmembers});
    this.$scope.gname = '';

  }

  setgChecked(g) {
    // Set the checked property to the opposite of its current value
    Groups.update(g._id, {
      $set: {
        checked: !g.checked
      },
    });
  }
 
  removegGroup(g) {
    Groups.remove(g._id);
  }

  updateDB(){
    //messages
    console.log('updating');
    Meteor.call('updateDB', function(err,response) {
        if(err) {
          return;
        }
        });

  }

}


 
export default angular.module('numbersList', [
  angularMeteor
])
  .component('numbersList', {
    templateUrl: 'imports/components/numbersList/numbersList.html',
    controller: ['$scope', TodosListCtrl]
  });