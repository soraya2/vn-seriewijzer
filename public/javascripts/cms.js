(function() {
    'use strict';
    var socket              = io();
    var form                = document.getElementById('review-form');
    var uploadButton        = document.getElementById('upload');
    var successMessage      = document.getElementById('success');
    var notification        = document.getElementById('notification');

    socket.on('connection', function () {
        console.log('Connected to server!');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                socket.emit('new update');
                console.log('Form submitted');
                showSuccessMessage();
                setTimeout(function(){
                    form.submit();
                }, 1500)
            });
        };
        socket.on('update', function() {
            console.log('Review updated');
            showNotification();
        })
    });

    function showSuccessMessage () {
        if (successMessage) {
            setTimeout(function(){
                uploadButton.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }, 500);
        }
    };

    function showNotification () {
        if (notification) {
            notification.classList.remove('hidden');
            setTimeout(function(){
                notification.classList.add('hidden');
            }, 5000)
        }
    }
}());