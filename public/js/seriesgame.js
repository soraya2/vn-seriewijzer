(function() {
    'use-strict';
    var serieChoicesInput = document.querySelectorAll('input[type="checkbox"]');
    var numbersArr = ['one', 'two', 'three', 'four'];
    var nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;

    for (var i = 0; i < serieChoicesInput.length; i++) {
        serieChoicesInput[i].addEventListener('change', function(){
            console.log(this);
            // Check if there already is an active class, if so, remove it
            if (document.getElementById('active')){
                document.getElementById('active').removeAttribute('id', 'active');
            }
            // Check if it already has an ID, if so, remove it, else, set the attribute
            if ((this.parentNode.className).length > 0){
                this.removeAttribute('name');
                this.parentNode.removeAttribute('id');
                this.parentNode.removeAttribute('class');
            } else {
                for (var i = numbersArr.length; i >= 0; i--) {
                    if(document.querySelector('.' + numbersArr[i]) === null){
                        this.setAttribute('name', numbersArr[i]);
                        this.parentNode.setAttribute('id', 'active');
                        this.parentNode.setAttribute('class', numbersArr[i]);
                        // this.parentNode.setAttribute('class', 'active');
                    }
                }
            }
            if (document.querySelector('.four') !== null){
                nextBtn.disabled = false;
            } else {
                nextBtn.disabled = true;
            }
        })
    }
}());
