import '../imports/api/numbers.js';
//const twilio = Meteor.npmRequire('twilio')
import twilio from 'twilio';
import { Responses } from '../imports/api/numbers.js';


Meteor.startup(function () {
  // code to run on server at startup
  //Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://xxx.ngrok.io';


  Router.route('/twilio/handle', {  
            where: 'server'
        })
        .get(function() {
        	console.log(this.params.query.From);
        	console.log(this.params.query.Body);
        	//var reply = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms from="[TWILIOFROM]" to="[TO]">[BODY]</Sms></Response>'
           // .replace('[TWILIOFROM]', this.params.query.To)
           // .replace('[TO]', this.params.query.From)
           // .replace('[BODY]', 'fuckoff');
            //this.response.end(reply);
            Responses.insert({user:this.params.query.From,response:this.params.query.Body,createdAt: new Date()});
            Meteor.call('sendSMS',this.params.query.From,'fucker',function(err,response) {
		      if(err) {
		        return;
		      }
		      console.log(response);
    		});
    	 });



  Meteor.methods({
    sendSMS: function (number,message) {
        var accountSid = 'AC0ebf069ec19135f7be54fa875f69e023';
	    var authToken = "02e71257ffb78241ac845d04ab5e3aaa";
	    var client = require('twilio')(accountSid, authToken);
	    console.log(message);
		client.sendMessage({
		    to:number, // Any number Twilio can deliver to
		    from: "+14013541756", // A number you bought from Twilio and can use for outbound communication
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
    }
  });





});