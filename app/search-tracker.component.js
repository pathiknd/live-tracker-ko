define(["knockout"], function(ko){
    function SearchTrackerComponent(){
        var self = this;
        this.searchTerm = ko.observable("");        

        self.onSearchItem;
        self.onEndSearch;

        this.keyPress = function(data, event){            
            if(event.keyCode == 27 || self.searchTerm().length == 0){
                if(self.onEndSearch !== undefined){
                    self.onEndSearch();
                    self.searchTerm("");
                }
            }
            else if(self.searchTerm().length > 1){
                if(self.onSearchItem !== undefined){
                    self.onSearchItem(self.searchTerm());
                }
            }
        }
    }
    return SearchTrackerComponent;
})