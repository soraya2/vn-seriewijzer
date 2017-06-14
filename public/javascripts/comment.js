(function() {
    'use strict'

    var socket = io();

    var commentList = document.querySelector('.comment-list');
    var textField = document.querySelector('[type="text"]');
    var showTitle = document.querySelector('.movie-details h2').innerHTML;

    document.querySelector('[type="submit"]').addEventListener('click', function(e) {
        e.preventDefault();

        comment.getValue();
    });

    var comment = {
        getValue: function() {
            var text = textField.value;

            comment.emit(text);

            textField.value = '';
        },
        emit: function(comm) {
            socket.emit('comment', {
                text: comm,
                username: 'testuser',
                time: new Date().toLocaleString()
            });
        },
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

            commentList.appendChild(listItem);
        }
    };

    socket.on('comment', function(comm) {
        comment.render(comm);
    });
})();