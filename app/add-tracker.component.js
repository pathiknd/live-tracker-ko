define(["knockout"], function(ko){

    function AddTrackerComponent(){
        var self = this;
        this.name = ko.observable();
        this.onAddItem;

        this.addItem = function(){
            if(self.onAddItem !== undefined){
                self.onAddItem(self.name());
            }
        }
    }

    return AddTrackerComponent;

})