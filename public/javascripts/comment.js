/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function() {
    'use strict';

    var socket = io(),
        commentList = document.querySelector('.comment-list'),
        textField = document.querySelector('[type="text"]'),
        selectBoxVote = document.querySelector('#vote'),
        showTitle = document.querySelector('h1').innerHTML;

    var comment = {
        //Get comment, execute comment.emit and clear inputfield
        getValue: function() {
            var text = textField.value;
            var rating = selectBoxVote.value;

            comment.emit(text, rating);

            textField.value = '';
        },
        //Send comment to the server.
        emit: function(comm, rating) {
            socket.emit('save comment', {
                title: showTitle,
                rating: rating,
                text: comm,
                time: new Date().toLocaleString()
            });
        },
        //Render new comments by creating elements and adding them
        render: function(newComment) {
            var listItem = document.createElement('li'),
                textEl = document.createElement('p'),
                userEl = document.createElement('h4'),
                timeEl = document.createElement('time');

            var textNode = document.createTextNode(newComment.text),
                userNode = document.createTextNode(newComment.username),
                timeNode = document.createTextNode(newComment.time);

            textEl.appendChild(textNode);
            userEl.appendChild(userNode);
            timeEl.appendChild(timeNode);

            listItem.appendChild(userEl);
            listItem.appendChild(textEl);
            listItem.appendChild(timeEl);

            commentList.insertBefore(listItem, commentList.childNodes[0]);
        }
    };

    //When the server sends a new comment
    socket.on('comment', function(comm) {
        //If the tv show title of the comment matches the one on this page, render the comment
        if(comm.title == showTitle){
            comment.render(comm);
        }
    });

    //if your logged on, commenting is enabled so add an addEventListener
    if(document.querySelector('[type="submit"]')){
        document.querySelector('[type="submit"]').addEventListener('click', function(e) {
            e.preventDefault();

            comment.getValue();
        });
    };
})();
