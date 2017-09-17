(function() {
    'use strict';

    var filterButton = document.querySelector('#filter-button');
    var filterForm = document.querySelector('.form-filter > form');
    var overlay = document.querySelector('.filter-overlay');
    // console.log(document.querySelector('.form-filter > form'));


    function init() {
        // filterForm.className = 'hide';
    }

    filterButton.addEventListener('click', function() {


        if (filterForm.className === 'hide' || filterForm.className === 'hide-filter') {

            filterButton.className = 'move-button';
            filterForm.className = '';
            overlay.className += ' show';

        } else {
            filterForm.className = 'hide-filter';
            filterButton.className = '';
            overlay.className = overlay.className.replace(' show', '');
        }
    });

    // document.onreadystatechange = function(e) {
    //     if (document.readyState === 'complete') {
    //         init();

    //     }
    // };

}());
