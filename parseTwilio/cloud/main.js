

// Require and initialize the Twilio module with your credentials
var client = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');

// Send an SMS message
client.sendSms({
        to:'+19168330413',
        from: '+14506667788',
        body: 'Hello world!'
    }, function(err, responseData) {
        if (err) {
            console.log(err);
        } else {
            console.log(responseData.from);
            console.log(responseData.body);
        }
    }
);