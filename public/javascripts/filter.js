(function() {
    'use strict';

    // for (key in req.session.personaform) {
    //     if (req.session.personaform.hasOwnProperty(key)) {

    //         // arrayCheck(key, req.session.personaform[key]);
    //     }
    // }

    var filters = {};

    // filters.test = 'test1';
    // filters.test2 = 'test2';
    var overviewContainer = document.getElementsByClassName('review-overview-container');


    var filterCheckbox = document.getElementsByClassName('filter-checkbox');
    // console.log(filterCheckbox);



    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    };


    httpGetAsync('https://220cf296.ngrok.io/search', callback);


    function callback(data) {
        var reviews = JSON.parse(data);
        for (var i = 0; i < filterCheckbox.length; i++) {
            // filterCheckbox[i];

            filterCheckbox[i].addEventListener('change', function(argument) {
                // console.log(this.checked);
                if (this.checked) {
                    // this.value
                    arrayCheck(this.name, this.value);

                    filter(reviews);
                    console.log(filters);
                }

            });
        }
        overviewContainer[0].innerHTML = reviews
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


    function filter(reviewData) {

        var filterdData = reviewData.filter(function(serie) {

            return Object.keys(filters).every(function(key) { // For each key in filter return filter key value
                // console.log(filters[key]);
                // return filters[key].some(function(filterOptions) { // Compare filter options with serie tags

                //     return serie.review[key].some(function(seriesTags) {

                //         console.log(filterOptions === seriesTags);

                //         return filterOptions === seriesTags;
                //     });

                // });
            });
        });

        // console.log(filterdData);
    }


    function setFilter(filterName, filterValue) {

        filters[filterName] = filterValue;

        // console.log(filters);

    }


    // function setFilter(filterName) {

    //     delete filters[filterName];

    //     var index = filters[filterName].indexOf(filterName);

    //     if (index > -1) {
    //         array.splice(index, 1);
    //     }
    // }


    function arrayCheck(filterName, filterValue) {

        if (Array.isArray(filterValue) === false) {
            // console.log(filterName, filterValue);
            // filters[filterName].push(filterValue);
            if (!(filterName in filters)) {

                setFilter(filterName, new Array(filterValue));

                console.log(Array.isArray(filterValue));
            }

        }
        if (Array.isArray(filterValue)) {

            // setFilter(filterName, filterValue);
            filters[filterName].push(filterValue);
        }
    }
})();
