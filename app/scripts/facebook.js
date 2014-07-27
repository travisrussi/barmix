
window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '297482083757183', // Facebook App ID
        channelUrl : '//www.getbarmix.com/channel.html', // Channel File
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true  // parse XFBML
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));