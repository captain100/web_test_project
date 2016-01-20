var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;


Template7.global = {
    android: isAndroid,
    ios: isIos
};

var $$ = Dom7;

if (isAndroid) {
    $$('head').append('<link rel="stylesheet" href="../../dist/css/framework7.material.min.css">' +
        '<link rel="stylesheet" href="../../dist/css/framework7.material.colors.min.css">' +
        '<link rel="stylesheet" href="../../dist/css/my-app.css">')
} else {
    $$('head').append('<link rel="stylesheet" href="../../dist/css/framework7.ios.min.css">' +
        '<link rel="stylesheet" href="../../dist/css/framework7.ios.colors.min.css">' +
        '<link rel="stylesheet" href="../../dist/css/my-app.css">'
    )
}
// Change Through navbar layout to Fixed
if (isAndroid) {
    // Change class
    $$('.view .navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
    // And move Navbar into Page
    $$('.view .navbar').prependTo('.view .page');
}

// Init App
var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: isAndroid ? true : false,
    // Enable Template7 pages
    template7Pages: true
});

// Init View
var mainView = myApp.addView('.view-main', {
    // Don't worry about that Material doesn't support it
    // F7 will just ignore it for Material theme
    dynamicNavbar: true
});