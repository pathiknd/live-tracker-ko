define(["knockout","app/dashboard.component"], function(ko,DashboardComponent){    
    function AppInit(){
        this.dashboard = new DashboardComponent();
    }

    AppInit.prototype.init = function() {

        ko.components.register("tracker", {
            viewModel: {
                createViewModel: function(params){
                    return params.value;
                }
            },
            template: {require: "text!app/tracker.template.html"}
        });

        ko.components.register("add-tracker", {
            viewModel: {            
                createViewModel: function(params){
                    return params.value;
                }
            },
            template: {require: "text!app/add-tracker.template.html"}
        });    

        ko.components.register("search-tracker", {
            viewModel: {            
                createViewModel: function(params){
                    return params.value;
                }
            },
            template: {require: "text!app/search-tracker.template.html"}
        });     

        ko.components.register("dashboard", {
            viewModel: {
                createViewModel: function(){
                    var dc = new DashboardComponent();
                    dc.init();
                    return dc;
                }
            },
            template: {require: "text!app/dashboard.template.html"}
        });
    }

    return AppInit;
})