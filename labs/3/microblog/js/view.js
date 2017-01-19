var view = (function(){
    "use strict";

    var view = {};

    // DOM event handler for creating new message
    document.getElementById("create_message_form").onsubmit = function (e) {
        e.preventDefault();
        // read from elements
        var username = document.getElementById("create_message_name").value;
        var content = document.getElementById("create_message_content").value;
        // dispatch 'onFormSubmit' to controller
        var event = new CustomEvent('onFormSubmit', {
            detail: {
                username: username,
                content: content
            }
        });
        document.dispatchEvent(event);

        // clean form
        document.getElementById("create_message_form").reset();
    };

    // insert new message
    view.insertMessage = function (username, content) {
        // create a new message element
        var e = document.createElement('div');
        e.className = "message";
        e.innerHTML = `
            <div class="message_header">
                <div class="message_avatar"><img src="media/user.png" alt="${username}"/></div>
                <div class="message_name">${username}</div>
            </div>
            <div class="message_content">${content}</div>
            <div class="message_vote">
                <div class="down_button vote_button" id="${username}_downvote" onclick="view.clickOnVote('${username}', 'downvote', document.getElementById('${username}_downvote').innerHTML);">0</div>
                <div class="up_button vote_button" id="${username}_upvote" onclick="view.clickOnVote('${username}', 'upvote', document.getElementById('${username}_upvote').innerHTML);">0</div>
            </div>`;
        // add this element to the document
        document.getElementById("messages").prepend(e);
    };

    // retrieve remaining data
    view.retrieveMessage = function (username, content, downvote, upvote) {
        // create a new message element
        var e = document.createElement('div');
        e.className = "message";
        e.innerHTML = `
            <div class="message_header">
                <div class="message_avatar"><img src="media/user.png" alt="${username}"/></div>
                <div class="message_name">${username}</div>
            </div>
            <div class="message_content">${content}</div>
            <div class="message_vote">
                <div class="down_button vote_button" id="${username}_downvote" onclick="view.clickOnVote('${username}', 'downvote', document.getElementById('${username}_downvote').innerHTML);">${downvote}</div>
                <div class="up_button vote_button" id="${username}_upvote" onclick="view.clickOnVote('${username}', 'upvote', document.getElementById('${username}_upvote').innerHTML);">${upvote}</div>
            </div>`;
        // add this element to the document
        document.getElementById("messages").prepend(e);
    };

    // DOM event handler for updating vote number
    view.clickOnVote = function (username, type, count) {
        // dispatch 'onVoteUpdate' to controller
        var event = new CustomEvent('onVoteUpdate', {
            detail: {
                username: username,
                type: type,
                count: parseInt(count)+1
            }
        });
        document.dispatchEvent(event);
    };

    // update the vote number
    view.updateNewVote = function (username, type, count) {
        document.getElementById(username + "_" + type).innerHTML = count;
    };

    return view;

}());