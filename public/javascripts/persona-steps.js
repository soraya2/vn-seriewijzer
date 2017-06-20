// BEGIN SORAYA
(function() {
    if (document.getElementsByTagName('persona-check')) {
        var personaSteps = document.getElementsByClassName('persona-check'),
            personaButton = document.getElementById('persona-button'),
            personaSubmit = document.getElementById('persona-submit'),
            count = 1,
            i,
            index;
        // Hiding submit button untill the last step;
        personaButton.removeAttribute('hidden');
        personaSubmit.className += ' hide';

        //hide all sections except the first
        for (i = 1; i < personaSteps.length; i++) {
            //FEATURE DETECTIONS BY CHANEL
            if(personaSteps[i].classList){
                personaSteps[i].classList.add('fade-in', 'fade-out', 'to-back');
            } else {
                personaSteps[i].className += ' fade-in fade-out to-back';
            }

            toggleCheckboxes(i, true);
        }

        if(personaSteps[0].classList){
            personaSteps[0].classList.add('fade-in');
        } else {
            personaSteps[0].className += ' fade-in';
        }

        function nextStep(e) {
            e.preventDefault();

            switch (count) {

                case 1:
                    if(personaSteps[0].classList){
                        personaSteps[0].classList.add('fade-out');
                        personaSteps[count].classList.remove('fade-out');
                    } else {
                        personaSteps[0].className += ' fade-out';
                        personaSteps[count].className = personaSteps[count].className.replace(' fade-out', '');
                    }
                    toggleCheckboxes(0, true);
                    toggleCheckboxes(count, false);

                    break;

                case 2:
                    personaSubmit.className = ' submit-persona';
                    personaButton.className += ' hide';

                    for (index = 0; index < personaSteps.length; index++) {
                        if(personaSteps[index].classList){
                            personaSteps[index].classList.add('fade-out');
                        } else {
                            //BEGIN CHANEL
                            var sub = 'fade-out';

                            //Check if item already has class 'fade-out'
                            if(personaSteps[index].className.indexOf(sub) == -1){
                                personaSteps[index].className += ' fade-out';
                            }
                            //END CHANEL
                        }
                        toggleCheckboxes(index, true);
                    }

                    if(personaSteps[count].classList){
                        personaSteps[count].classList.remove('fade-out');
                    } else {
                        personaSteps[count].className = personaSteps[count].className.replace(' fade-out', '');
                    }
                    toggleCheckboxes(count, false);
            }

            return personaSteps[count++];
        }

        // BEGIN CHANEL
        function toggleCheckboxes(el, value) {
            var checkboxes = document.querySelectorAll('.persona-check:nth-of-type(' + (el + 1) + ') input[type="checkbox"]');

            for (var b = 0; b < checkboxes.length; b++) {
                checkboxes[b].disabled = value;
            }
        }
        // END CHANEL

        personaButton.addEventListener('click', nextStep);
    }
}());
// END SORAYA
