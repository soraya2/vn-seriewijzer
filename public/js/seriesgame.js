(function() {
    'use-strict';
    var serieChoices = document.getElementsByTagName('section');
    var numbersArr = ['one', 'two', 'three', 'four'];
    var nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;

    for (var i = 0; i < serieChoices.length; i++) {
        serieChoices[i].addEventListener('click', function(){
            // Check if there already is an active class, if so, remove it
            if (document.querySelector('.active')){
                document.querySelector('.active').removeAttribute('class', 'active');
            }
            // Check if it already has an ID, if so, remove it, else, set the attribute
            if ((this.id).length > 0){
                this.removeAttribute('id');
                this.classList.remove('active');
            } else {
                for (var i = numbersArr.length; i >= 0; i--) {
                    if(document.getElementById(numbersArr[i]) === null){
                        this.setAttribute('id', numbersArr[i]);
                        this.setAttribute('class', 'active');
                    }
                }
            }
            if (document.getElementById('four') !== null){
                nextBtn.disabled = false;
            } else {
                nextBtn.disabled = true;
            }
        })
    }
}());

// Volgende knop pas beschikbaar wanneer je alles hebt ingevuld
