(function() {
    'use strict';


    var socket = io();

    var elements = {
        form: document.getElementById('review-form'),
        uploadButton: document.getElementById('upload'),
        successMessage: document.getElementById('success'),
        notification: document.getElementById('notification')
    }

    var app = {
        init: function() {
            socket.on('connection', function() {
                console.log('Connected to server!');
                if (elements.form) {
                    elements.form.addEventListener('submit', function(e) {
                        e.preventDefault();
                        socket.emit('new update');
                        console.log('Form submitted');
                        app.showSuccessMessage();
                        setTimeout(function() {
                            elements.form.submit();
                        }, 1500)
                    });
                };
                socket.on('update', function() {
                    console.log('Review updated');
                    app.showNotification();
                })
            });
        },
        showSuccessMessage: function() {
            if (elements.successMessage) {
                setTimeout(function() {
                    elements.uploadButton.setAttribute('class', 'hidden');
                    elements.successMessage.removeAttribute('class', 'hidden');
                }, 500);
            }
        },
        showNotification: function() {
            if (elements.notification) {
                elements.notification.removeAttribute('class', 'hidden');
                setTimeout(function() {
                    elements.notification.setAttribute('class', 'hidden');
                }, 5000)
            }
        }
    };
    app.init();
}());
