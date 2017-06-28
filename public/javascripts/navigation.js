(function() {
    'use strict';

    var hamburger   = document.getElementById('hamburger');
    var menu        = document.querySelector('nav');

    hamburger.addEventListener('click', function () {
        menu.classList.toggle('unhide');
        console.log('toggled');
    })
}());
