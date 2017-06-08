(function() {
    if (document.getElementsByTagName('persona-check')) {
        var personaSteps = document.getElementsByClassName('persona-check');
        var personaButton = document.getElementById('persona-button');
        var personaSubmit = document.getElementById('persona-submit');
        var count = 1;
        var i;
        var index;
        // Hideing submit button untill the last step;
        personaSubmit.className += " hide";

        //hide all sections except the first
        for (i = 1; i < personaSteps.length; i++) {
            personaSteps[i].classList.add('hide');
        }

        function nextStep(e) {
            e.preventDefault();
            console.log();
            switch (count) {

                case 1:
                    personaSteps[0].classList.add('hide');
                    personaSteps[count].classList.remove('hide');

                    break;

                case 2:
                    personaSubmit.className = ' submit-persona';
                    personaButton.classList.add('hide');

                    for (index = 0; index < personaSteps.length; index++) {
                        personaSteps[index].classList.add('hide');
                    }

                    personaSteps[count].classList.remove('hide');
                    break;
            }

            return personaSteps[count++];
        }

        personaButton.addEventListener('click', nextStep);
    }
}());
