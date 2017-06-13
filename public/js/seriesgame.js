(function() {
    'use-strict';
    var serieChoices = document.getElementsByTagName('section');

    for (var i = 0; i < serieChoices.length; i++) {
        serieChoices[i].addEventListener('click', function(){
            console.log(document.getElementById('three') !== null);
            if (document.getElementById('three') !== null){
                serieChoices[i].setAttribute('id', 'four');
            } else if (document.getElementById('two') !== null){
                serieChoices[i].setAttribute('id', 'three');
            } else if (document.getElementById('one') !== null){
                serieChoices[i].setAttribute('id', 'two');
            } else {
                serieChoices[i].setAttribute('id', 'one');
            }
        })
    }
}());
