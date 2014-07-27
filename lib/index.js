/*!
 * Module dependencies.
 */

var connect = require('connect'),
    phonegap = require('connect-phonegap'),
    app = connect();

/*!
 * Create Connect server using the PhoneGap middleware.
 */

//app.use(phonegap({
//    autoreload: false,
//    'auto-reload': false
//}));


var port = process.env.PORT || 3000;
app.listen(port);