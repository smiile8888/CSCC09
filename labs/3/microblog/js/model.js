var model = (function(){
    "use strict";

    // retrieve remaining data
    window.onload = function () {
        for(var i = 0; i<localStorage.length; i++) {
            var value = JSON.parse(localStorage.getItem(localStorage.key(i)));
            var retrieveEvent = new CustomEvent('onRetrieveStorage', {
                detail: value
            });
            document.dispatchEvent(retrieveEvent);
        }
    };
    
    var model = {
        username: "",
        content: "",
        downvote: 0,
        upvote: 0
    };

    // store new message locally
    model.createMessage = function (username, content) {
        model.username = username;
        model.content = content;
        // store new data locally
        localStorage.setItem(model.username, JSON.stringify(model));
        // dispatch 'onNewMessage' to controller
        var event = new CustomEvent('onNewMessage', {
            detail: {
                username: model.username,
                content: model.content
            }
        });
        document.dispatchEvent(event);
    };

    // update vote number
    model.updateVote = function (username, type, count) {
        // update the value in localStorage
        var value = JSON.parse(localStorage.getItem(username));
        value[type] = count;
        localStorage.setItem(username, JSON.stringify(value));
        // dispatch 'onNewVote' to controller
        var event = new CustomEvent('onNewVote', {
            detail: {
                username: username,
                type: type,
                count: count
            }
        });
        document.dispatchEvent(event);
    };

    return model;

}());