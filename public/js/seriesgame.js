(function() {
    'use-strict';
    var serieChoices = document.getElementsByTagName('section');

    for (var i = 0; i < serieChoices.length; i++) {
        serieChoices[i].addEventListener('click', function(){
            // Check if there already is an active class, if so, remove it
            if (document.querySelector('.active')){
                document.querySelector('.active').removeAttribute('class', 'active');
            }
            // Check what classes already exist to check what rating each element gets, also set that Item to active to give it a different styling.
            if (document.getElementById('three') !== null){
                this.setAttribute('id', 'four');
                this.setAttribute('class', 'active');
            } else if (document.getElementById('two') !== null){
                this.setAttribute('id', 'three');
                this.setAttribute('class', 'active');
            } else if (document.getElementById('one') !== null){
                this.setAttribute('id', 'two');
                this.setAttribute('class', 'active');
            } else {
                this.setAttribute('id', 'one');
                this.setAttribute('class', 'active');
            }
        })
    }
}());
