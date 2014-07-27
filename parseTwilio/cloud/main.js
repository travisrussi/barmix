
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


Parse.Cloud.define("receiveSMS", function(request, response) {
    console.log("Received a new text: " + request.params.From);
    response.success('<?xml version="1.0" encoding="UTF-8"?>' +
    '    <Response>' +
    '    <Message>I\'m hungry!</Message>' +
    '    </Response>');
});



// Require and initialize the Twilio module with your credentials
//var client = require('twilio')('AC72a1fbdca67d3541bc8aada6508c3bf8', '53a877386beaa14ca994e2d49d500ccc');

// Send an SMS message
//client.sendSms({
//        to:'+19168330413',
//        from: '+19167643946',
//        body: 'Hello world!'
//    }, function(err, responseData) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log(responseData.from);
//            console.log(responseData.body);
//        }
//    }
//);