define(["knockout","app/tracker.component","core/MarketDataProvider", "app/add-tracker.component","app/search-tracker.component" ], 
    function(ko,TrackerComponent, MarketDataProvider, AddTrackerComponent,SearchTrckerComponent){
    function DashboardComponent(){
        var self = this;        

        self.trackedItems = ko.observableArray();
        self.dataServer = new MarketDataProvider();
        self.addTrackerVM = new AddTrackerComponent();
        self.searchTrackerVM = new SearchTrckerComponent();        

        function trackItem(data){
            var tc = new TrackerComponent();
            tc.onRemoveItem = self.removeItem;
            self.dataServer.addClient(self.trackedItems().length,data.toUpperCase(),tc.newData);
            self.trackedItems.push(tc);            
        }

        this.removeItem = function(data){
            self.trackedItems.remove(function(item){
                return data.topic() == item.topic();
            })
        }

        this.addItem = function(data){
            trackItem(data);
        }

        self.addTrackerVM.onAddItem = self.addItem;

        this.searchItem = function(searchTerm){
            searchTerm = searchTerm.toUpperCase();
            undestroyAll(self.trackedItems());
            self.trackedItems.destroy(function(item){
                return item.topic().indexOf(searchTerm) < 0;
            })
        }

        this.endSearch = function(){
            undestroyAll(self.trackedItems());
            self.trackedItems.valueHasMutated();
        }

        function undestroyAll(items){
            //var keys = self.trackedItems();
            for(var key in items){
                var item = items[key];
                item._destroy = false;
            }
        }        

        self.searchTrackerVM.onSearchItem = self.searchItem;
        self.searchTrackerVM.onEndSearch = self.endSearch;
  

        this.init = function(){
            var list = ["LON:VOD", "NSE:LT", "NSE:TCS", "CURRENCY:GBPUSD", "CURRENCY:EURGBP", "NSE:TATASTEEL"
            , "NSE:ICICIBANK", "NSE:TATAMOTORS"];            
            for(var s in list){
                trackItem(list[s]);
            }                                
        }     
    }

    return DashboardComponent;
});