(function() {
    'use-strict';
    var serieChoicesInput = document.getElementsByTagName('img');
    var numbersArr = ['one', 'two', 'three', 'four'];
    var nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;

    for (var i = 0; i < serieChoicesInput.length; i++) {
        // With a click on the image the ranking will be triggered
        serieChoicesInput[i].addEventListener('click', function() {
            // save this in self and send it with the function, so the this will always have the
            // same meaning
            var self = this;
            selectClickedItem(self);
        });
        // To make sure the page is tabable, put a keydown event on the checkbox, so it can be selected With
        // the spacebar
        if (serieChoicesInput[i].parentNode.querySelector('input[type="checkbox"]') !== null) {
            serieChoicesInput[i].parentNode.querySelector('input[type="checkbox"]').addEventListener('keydown', function(e) {
                // save this in self and send it with the function, so the this will always have the
                // same meaning
                var self = this;
                if (e.keyCode === 32) {
                    selectClickedItem(self);
                }
            })
        }
    }

    function selectClickedItem(self) {
        console.log(self);
        // Check if there already is an active class, if so, remove it
        if (document.getElementById('active')) {
            document.getElementById('active').removeAttribute('id', 'active');
        }
        // Check if it already has an ID, if so, remove it, else, set the attribute
        if ((self.parentNode.className).length > 0) {
            self.parentNode.querySelector('input[type="checkbox"]').removeAttribute('name');
            self.parentNode.removeAttribute('id');
            self.parentNode.removeAttribute('class');
        } else {
            for (var i = numbersArr.length; i >= 0; i--) {
                // check if the class 'one'', 'two', 'three' or 'four' exists, if so, give it this class
                if (document.querySelector('.' + numbersArr[i]) === null) {
                    self.parentNode.querySelector('input[type="checkbox"]').setAttribute('name', numbersArr[i]);
                    self.parentNode.setAttribute('id', 'active');
                    self.parentNode.setAttribute('class', numbersArr[i]);
                }
            }
        }
        // Check if one off the classes is missing, if so, enable the submit button (this makes sure the user
        // ranks every tvshow before proceding)
        if (document.querySelector('.one') === null || document.querySelector('.two') === null || document.querySelector('.three') === null || document.querySelector('.four') === null) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
	// if (nextBtn.disabled === false) {
	// 	var active = document.getElementById('active');
	// 	active.removeAttribute('id', 'active');
	// }
}());
