(function() {
    'use strict';

    var filterButton = document.querySelector('#filter-button');
    var filterForm = document.querySelector('.form-filter > form');
    // console.log(document.querySelector('.form-filter > form'));
    function init() {
        filterForm.className = 'hide-filter';
        // getReviewData('https://220cf296.ngrok.io/search', callback);
    }


    filterButton.addEventListener('click', function() {

        // filterForm.className = "hide-filter";

        if (filterForm.className) {
            console.log('test');

            filterButton.className = 'move-button';
            filterForm.className = '';
            // filterForm.style.width = '300px';


        } else {
            filterForm.className = 'hide-filter';
            filterButton.className = '';
            // filterForm.style.width = '0';

        }
    });
    init();

}());
