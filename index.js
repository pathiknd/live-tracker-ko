//var requriejs = require("requirejs");

requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        core: '../core',
        lib: '.',
        "rx": 'https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all',
        "jquery": "http://code.jquery.com/jquery-3.1.1.min"        
    },
    nodeRequire: require
});

requirejs(["knockout", "text", "app/main"], function(ko, text, main, DashboardComponent){
    var appMain = new main();
    appMain.init();
    ko.applyBindings();
});
