(function() {
    'use strict';
    var socket = io();
    var overviewContainer = document.getElementsByClassName('review-overview-container');
    var filterCheckbox = document.getElementsByClassName('filter-checkbox');
    var filters = {};
    var checkboxValue;
    var filterButton = document.querySelector('#filter-button');
    var filterForm = document.querySelector('.form-filter > form');

    function init() {

        socket.on('get reviews', function(url) {

            getReviewData(url.dataURL, reviewCallback);

        });

    }



    function getReviewData(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("POST", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    function reviewCallback(data) {

        var reviews = JSON.parse(data);
        for (var i = 0; i < filterCheckbox.length; i++) {

            filterCheckbox[i].addEventListener('change', function() {
                if (this.checked) {
                    checkboxValue = this.value;

                    arrayCheck(this.name, checkboxValue, true);
                    filter(reviews);
                    renderview(filter(reviews));
                    console.log(filter(reviews));

                } else if (!this.checked) {

                    checkboxValue = this.value;
                    arrayCheck(this.name, checkboxValue, false);
                    filter(reviews);
                    renderview(filter(reviews));
                }

                function renderview(reviewData) {

                    overviewContainer[0].innerHTML = filter(reviewData)
                        .reduce(function(html, object, i) {

                            return html + `
                                     <div class="review">
                                         <div>
                                             <img src="${object.review.imgURL}" alt="">
                                         </div>
                                         <div class="text-container">
                                             <span class="rating">Score: ${ object.review.reviewRating }</span>
                                             <a class="detail-link" href="/detail/${ object.review.seriesName }">
                                                 <h3>${ object.review.seriesName }</h3>
                                             </a>
                                             <p class="post-date">Op: ${object.user.postDate }</p>
                                             <h4>${ object.review.reviewTitle }</h4>
                                             <p class="post-user">Door ${ object.user.name }</p>


                                             <p class="intro-text">${ object.review.reviewPlot.substring(0, 210) }
                                                   <a class="bottom-link" href="/detail/${ object.review.seriesName }">
                                                     Lees meer
                                                 </a>
                                             </p>
                                         </div>
                                     </div>
                                `;
                        }, '');
                }
            });
        }
    }

    function filter(reviewData) {

        return reviewData.filter(function(serie) {

            if (Object.keys(filters).length === 0) {
                return Object.keys(filters).every(function(key) {

                    return filterSet(key); // For each key in filter return filter key value
                });

            } else {
                return Object.keys(filters).some(function(key) {

                    return filterSet(key); // For each key in filter return filter key value
                });
            }

            function filterSet(keyNaam) {
                return filters[keyNaam].some(function(filterOptions) { // Compare filter options with serie tags

                    return serie.review[keyNaam].some(function(seriesTags) {

                        return filterOptions === seriesTags;
                    });
                });
            }
        });
    }

    function setFilter(filterName, filterValue) {

        filters[filterName] = filterValue;
    }

    function removeFilter(filterName, filterValue) {

        var index = filters[filterName].indexOf(filterValue);

        if (index === 0) {

            delete filters[filterName];

        } else if (index > -1) {

            filters[filterName].splice(index, 1);

        }
    }

    function arrayCheck(filterName, filterValue, checked) {
        //check if the value is not an array
        if (Array.isArray(filterValue) === false) {

            if (!(filterName in filters)) {

                if (checked === true) {

                    setFilter(filterName, new Array(filterValue));

                } else {

                    removeFilter(filterName, new Array(filterValue));
                }
            }
        }

        // check the value is an array
        if (Array.isArray(filters[filterName])) {

            if (filters[filterName].indexOf(filterValue) == -1) {

                if (checked === true) {

                    filters[filterName].push(filterValue);
                }
            }

            if (checked === false) {

                removeFilter(filterName, filterValue);
            }
        }
    }
    init();
})();
