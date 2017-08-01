(function() {
    'use strict';

    var filterButton = document.querySelector('#filter-button');
    var filterForm = document.querySelector('.form-filter > form');
    // console.log(document.querySelector('.form-filter > form'));


    function init() {
        // filterForm.className = 'hide';
    }

    filterButton.addEventListener('click', function() {


        if (filterForm.className === 'hide' || filterForm.className === 'hide-filter') {

            filterButton.className = 'move-button';
            filterForm.className = '';

        } else {
            filterForm.className = 'hide-filter';
            filterButton.className = '';

        }
    });

    // document.onreadystatechange = function(e) {
    //     if (document.readyState === 'complete') {
    //         init();

    //     }
    // };

}());
