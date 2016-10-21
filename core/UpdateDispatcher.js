define(["rx"], function(Rx){
    function UpdateDispatcher(){
        this.receivers = new Object();    

        this.addReceiver = function(id, callback){
            this.receivers[id] = callback;
        }

        this.dispatchUpdate = function(update){
            for(var key in this.receivers){
                if(this.receivers.hasOwnProperty(key)){
                    this.receivers[key](update);
                }
            }
        }    

        this.removeReceiver = function(id){
            delete this.receivers[id];
        }
    }

    return UpdateDispatcher;
})