import '../imports/api/numbers.js';
//const twilio = Meteor.npmRequire('twilio')
import twilio from 'twilio';
import { Responses } from '../imports/api/numbers.js';
import {Messages} from '../imports/api/numbers.js';
import {Groups} from '../imports/api/numbers.js';
import {Numbers} from '../imports/api/numbers.js';
var cron = require('node-cron');
var Fiber = Npm.require('fibers');

Meteor.startup(function () {
  // code to run on server at startup
  //Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://xxx.ngrok.io';


  Router.route('/twilio/handle', {  
            where: 'server'
        })
        .get(function() {
        	//console.log(this.params.query.From);
        	//console.log(this.params.query.Body);

          Responses.insert({user:this.params.query.From,response:this.params.query.Body,createdAt: new Date()});

          if (Numbers.findOne({number: this.params.query.From}) != undefined) /*new number*/ {
            if (Numbers.findOne({number: this.params.query.From}).next_message == "name"){
              var message = "Welcome " + this.params.query.Body + ". You will begin receiving your daily messages tomorrow!";
              Numbers.update({number: this.params.query.From},{$set:{next_message:1,first_name:this.params.query.Body}});

              Meteor.call('sendSMS',this.params.query.From,message,function(err,response) {
                if(err) {
                  return;
                }
                console.log(response);
                 });
            }
          }

          if (this.params.query.Body == 'Join' || this.params.query.Body == 'join')
          {  
            if (Numbers.findOne({number: this.params.query.From}) == null){
              console.log('new person')
              var message = "Welcome to the East Boston Once-A-Day Texts for Health Program! Text QUIT at any time to stop. You will receive a message each day for one month. What is your name?";
               Numbers.insert({
                number: this.params.query.From,
                createdAt: new Date(),
                send_message: "true",
                next_message: "name"
              });
              Meteor.call('sendSMS',this.params.query.From,message,function(err,response) {
              if(err) {
                return;
              }
              console.log(response);
               });
            }
            else{
              Meteor.call('sendSMS',this.params.query.From,"You already joined!",function(err,response) {
              if(err) {
                return;
              }
              console.log(response);
               });
            }
          }

        /*  Meteor.call('sendSMS',this.params.query.From,'Welcome',function(err,response) {
		      if(err) {
		        return;
		      }
		      console.log(response);
    		});*/
    	 });

  cron.schedule('11 10 * * *',function(){
    console.log('running cron');
    Fiber(function() { 
      members= Numbers.find({send_message: 'true'});
      members.forEach(function(m){
        messageObject=Messages.findOne({mnum:m.next_message});
        Numbers.update({first_name:m.first_name},{$set:{next_message:m.next_message +1}});
        Meteor.call('sendSMS',m.number,messageObject.body,function(err,response) {
                  if(err) {
                    return;
                  }
                  console.log(response);
                   });
      });
  }).run();
});



  Meteor.methods({
    sendSMS: function (number,message) {
        var accountSid = 'AC8bcce77eee0948231d6473c4735fce94';
	    var authToken = "8890bfa6bea80b7f2373dee63ec0e516";
	    var client = require('twilio')(accountSid, authToken);
	    console.log(message);
		client.sendMessage({
		    to:number, // Any number Twilio can deliver to
		    from: "+16172022992", // A number you bought from Twilio and can use for outbound communication
		    body: message // body of the SMS message

		}, function(err, responseData) { //this function is executed when a response is received from Twilio
		    
			console.log(err)
		    if (!err) { // "err" is an error received during the request, if any

		        // "responseData" is a JavaScript object containing data received from Twilio.
		        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
		        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

		        console.log(responseData.from); // outputs "+14506667788"
		        console.log(responseData.body); // outputs "word to your mother."

		    }
		});
      return 'sent'
    },

    updateDB: function (){
      //messages
      Messages.update({mnum:1},{mnum:1,body:"This is message 1"},{ upsert: true });
      Messages.update({mnum:2},{mnum:2,body:"Message 2 coming at you"},{ upsert: true });
      Messages.update({mnum:3},{mnum:3,body:"Message 3 can't stop won't stop"},{ upsert: true });
      //User
      Numbers.update({first_name:'Austen'},{first_name:'Austen', last_name:'Novis',number:"14012610096",next_message:1,send_message:'true'},{ upsert: true });
      console.log('updates complete');
    }
  });





});