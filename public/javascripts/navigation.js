(function() {
    'use strict';

    var hamburger       = document.getElementById('hamburger');
    var menu            = document.querySelector('.main-navigation');
    var menuIsToggled   = false;

    hamburger.addEventListener('click', function () {
        if (!menuIsToggled) {
            menu.className += ' unhide';
            menuIsToggled = true;
        } else {
            menu.className = menu.className.replace(' unhide', '');
            menuIsToggled = false;
        }
    })
}());
