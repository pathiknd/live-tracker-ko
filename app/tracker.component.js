define(["knockout"], function(ko){
    function TrackerComponent(){
        var self = this;
        this.topic = ko.observable();        
        this.changePercent = ko.observable();
        this.lastTradePrice = ko.observable();
        this.lastTradeTime = ko.observable();
        this.isPriceUp = ko.computed(function(){
            return self.changePercent() > 0
        }, this);

        this.pauseUpdates = ko.observable(false);
        this.toggleUpdates = function(){            
            self.pauseUpdates(!self.pauseUpdates());
        }       

        this.newData = function(data){
            if(!self.pauseUpdates()){
                self.topic(data.symbol);            
                self.changePercent(data.changePercent);
                self.lastTradePrice(data.lastTradePrice);
                self.lastTradeTime(data.lastTradeTime);
            }
        };

        this.onRemoveItem;

        this.removeItem = function(){
            if(self.onRemoveItem !== undefined){
                self.onRemoveItem(self);
            }
        }
    }

    return TrackerComponent;
})