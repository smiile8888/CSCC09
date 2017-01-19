(function(){
    "use strict";

    // eventListener of 'onFormSubmit'
    document.addEventListener('onFormSubmit', function (e) {
        model.createMessage(e.detail.username, e.detail.content);
    });

    // eventListener of 'onVoteUpdate'
    document.addEventListener('onVoteUpdate', function (e) {
        model.updateVote(e.detail.username, e.detail.type, e.detail.count);
    });

    // eventListener of 'onNewMessage'
    document.addEventListener('onNewMessage', function (e) {
        view.insertMessage(e.detail.username, e.detail.content);
    });
    
    // eventListener of 'onRetrieveStorage'
    document.addEventListener('onRetrieveStorage', function (e) {
        view.retrieveMessage(e.detail.username, e.detail.content, e.detail.downvote, e.detail.upvote);
    });

    // eventListener of 'onNewVote'
    document.addEventListener('onNewVote', function (e) {
        view.updateNewVote(e.detail.username, e.detail.type, e.detail.count);
    })

}());