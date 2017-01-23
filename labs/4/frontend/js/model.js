var model = (function(){
    "use strict";
    
    var model = {};
    
    // Message constructor
    var Message = (function (){
        var id = 0;
        return function Message(message){
            if (message.id){
                this.id = message.id;
                id = (message.id>=id)? message.id+1 : id;
            }else{
                this.id = id++;
            }
            this.content = message.content;
            this.author = message.author;
            this.upvote = (message.upvote)? message.upvote : 0;
            this.downvote = (message.downvote)? message.downvote : 0;
        }
    }());

    // message store
    var messages = [];

    // scheduler
    setInterval(function(){
        model.getMessages();
    }, 2000);

    // init

    model.getMessages = function (){
        var method = "GET";                                     // either POST, PUT, GET, PATCH, DELETE
        var url = "http://localhost:3000/api/messages";         // the full url http:// ...
        var body = null;                                        // should be set to null for GET and DELETE
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                console.log(JSON.parse(this.status, this.responseText));
                // fetch data from the local store
                var data = localStorage.getItem("messages");
                if (data){
                    messages = JSON.parse(data).map(function(message){
                        return new Message(message);
                    });
                }
                // dispatch "messageUpdated"
                document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
    }
    
    // create
    
    model.createMessage = function (data){
        console.log(data);
        var method = "POST";                                    // either POST, PUT, GET, PATCH, DELETE
        var url = "http://localhost:3000/api/messages";         // the full url http:// ...
        var body = JSON.stringify(data);                        // should be set to null for GET and DELETE
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                console.log(JSON.parse(this.status, this.responseText));
                // create the message
                var message = new Message(data);
                messages.push(message);
                // update the local storage 
                localStorage.setItem("messages", JSON.stringify(messages));
                // dispatch "messageUpdated"
                document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
    }
    
    // update
    
    model.upvoteMessage = function (id){
        // select and upvote message
        var message = messages.find(function(e){
            return (e.id === id);
        });
        message.upvote+=1;
        // update the local storage and dispatch "messageUpdated"
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    }
    
    model.downvoteMessage = function (id){
        // select and downvote message
        var message = messages.find(function(e){
            return (e.id === id);
        });
        message.downvote+=1;
        // update the local storage and dispatch "messageUpdated"
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    }

    // delete

    model.deleteMessage= function (id){
        var method = "DELETE";                                      // either POST, PUT, GET, PATCH, DELETE
        var url = "http://localhost:3000/api/messages/" + id;       // the full url http:// ...
        var body = null;                                            // should be set to null for GET and DELETE
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                console.log(JSON.parse(this.status, this.responseText));
                // select and delete message
                messages = messages.filter(function(e){
                    return (e.id !== id);
                });
                // update the local storage and dispatch "messageUpdated"
                localStorage.setItem("messages", JSON.stringify(messages));
                // dispatch "messageUpdated"
                document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
    }
    
    return model;
    
}())
