(function() {
    'use-strict';
    var serieChoicesInput = document.getElementsByTagName('img');
    var serieChoicesCheckbox = document.querySelectorAll('input[type="checkbox"]');
    var numbersArr = ['one', 'two', 'three', 'four'];
    var nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;

    for (var i = 0; i < serieChoicesInput.length; i++) {
        serieChoicesInput[i].addEventListener('click', function(){
            var self = this;
            selectClickedItem(self);
        });
        if (serieChoicesInput[i].parentNode.querySelector('input[type="checkbox"]') !== null) {
            serieChoicesInput[i].parentNode.querySelector('input[type="checkbox"]').addEventListener('keydown', function(e){
                var self = this;
                if (e.keyCode === 32){
                    selectClickedItem(self);
                }
            })
        }
    }
    function selectClickedItem (self) {
        console.log(self);
        // Check if there already is an active class, if so, remove it
        if (document.getElementById('active')){
            document.getElementById('active').removeAttribute('id', 'active');
        }
        // Check if it already has an ID, if so, remove it, else, set the attribute
        if ((self.parentNode.className).length > 0){
            self.parentNode.querySelector('input[type="checkbox"]').removeAttribute('name');
            self.parentNode.removeAttribute('id');
            self.parentNode.removeAttribute('class');
        } else {
            for (var i = numbersArr.length; i >= 0; i--) {
                if(document.querySelector('.' + numbersArr[i]) === null){
                    self.parentNode.querySelector('input[type="checkbox"]').setAttribute('name', numbersArr[i]);
                    self.parentNode.setAttribute('id', 'active');
                    self.parentNode.setAttribute('class', numbersArr[i]);
                    // this.parentNode.setAttribute('class', 'active');
                }
            }
        }
        if (document.querySelector('.four') !== null){
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }
}());
