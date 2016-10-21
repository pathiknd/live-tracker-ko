define(["jquery","rx","core/UpdateDispatcher"], function($,Rx, UpdateDispatcher){

    function MarketDataProvider(){
        var dataStream;
        var self = this;
        this.trackedSymbols = [];
        this.streamOn = false;

        this.dispatchers = new Object();    

        this.getDispatcherFromSymbol = function(symbol){
            if(this.dispatchers.hasOwnProperty(symbol)){
                return this.dispatchers[symbol];
            } else {
                return null;
            }
        }

        this.addDispatcher = function(symbol){
            var newDispatcher = new UpdateDispatcher();
            this.dispatchers[symbol] = newDispatcher;
            return newDispatcher;        
        }

        this.trackSymbol = function(symbol){
            if(this.trackedSymbols.findIndex(function(val){
                return val == symbol;
            }) < 0){
                this.trackedSymbols.push(symbol);
            }
        }

        this.untrackSymbol = function(symbol){
            var index = this.trackedSymbols.findIndex(function(val){
                return val == symbol;
            });

            if(index >= 0){
                this.trackedSymbols.slice(index, 1);
            }
        }

        function getServiceUrl(){            
            var googleFinance = "https://finance.google.com/finance/info?q=";
            for(var symbol in self.trackedSymbols){
                googleFinance = googleFinance + self.trackedSymbols[symbol] + ",";
            }

            return googleFinance.substring(0, googleFinance.length - 1);
        }

        this.setupStreams = function(){
            dataStream = Rx.Observable.interval(5000)
                    .map(function(x){
                        return getServiceUrl();
                    })
                    .flatMap(function(url){
                        return Rx.Observable.fromPromise(new Promise(function(resolve, reject){
                            $.ajax({
                                url: getServiceUrl(),
                                dataType: "jsonp"
                            })
                            .done(function(data, textStatus, jqXhr){
                                resolve(data);
                            })
                            .fail(function(jqXhr, textStatus, error){
                                reject(null);
                            });
                        }))
                    })
                    .map(function(responseBody){
                         //return JSON.parse(responseBody);
                         return responseBody;
                    })
                    .map(function(responseData){
                        var objs = [];
                        for(var i in responseData){
                            var data = new Object();
                            var symbolData = responseData[i];
                            data["symbol"] = symbolData["e"] + ":" + symbolData["t"];                            
                            data["lastTradePrice"] = symbolData["l"];
                            data["lastTradeTime"] = symbolData["lt_dts"];
                            data["changePercent"] = symbolData["cp"];
                            data["exchange"] = symbolData["e"];                            
                            objs.push(data);
                        }

                        return objs;
                    })
                    .flatMap(function(updates){
                        return updates;
                    });                               

            dataStream.subscribe(function(data){
                if(data !== null){
                    var dispatcher = self.getDispatcherFromSymbol(data["symbol"]);
                    dispatcher.dispatchUpdate(data);
                }
            });
        }

        this.addClient = function(id, symbol, callback){
            var dispatcher = this.getDispatcherFromSymbol(symbol);
            if(dispatcher == null){
                dispatcher = this.addDispatcher(symbol);
            }

            dispatcher.addReceiver(id, callback);

            this.trackSymbol(symbol);
            //this.trackedSymbols.push(symbol);

            if(!this.streamOn){
                this.setupStreams();
                this.streamOn = true;
            }        
         }


        this.removeClient = function(id, symbol){
            var dispatcher = this.getDispatcherFromSymbol(symbol);
            dispatcher.removeReceiver(id);
        }                   
    }

    return MarketDataProvider;
});
