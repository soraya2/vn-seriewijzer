// BEGIN SORAYA
(function() {
    "use strict";

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
            personaSteps[i].classList.add('fade-in', 'fade-out', 'to-back');

            toggleCheckboxes(i, true);
        }

        personaSteps[0].classList.add('fade-in');

        function nextStep(e) {
            e.preventDefault();

            switch (count) {

                case 1:
                    personaSteps[0].classList.add('fade-out');
                    personaSteps[count].classList.remove('fade-out');
                    toggleCheckboxes(0, true);
                    toggleCheckboxes(count, false);

                    break;

                case 2:
                    personaSubmit.className = ' submit-persona';
                    personaButton.classList.add('hide');

                    for (index = 0; index < personaSteps.length; index++) {
                        personaSteps[index].classList.add('fade-out');
                        toggleCheckboxes(index, true);
                    }

                    personaSteps[count].classList.remove('fade-out');
                    toggleCheckboxes(count, false);
            }

            return personaSteps[count++];
        }


        // BEGIN CHANEL
        function toggleCheckboxes(el, value) {
            // var checkboxes = document.querySelectorAll('.persona-check:nth-of-type(' + (el + 1) + ') input[type="checkbox"]');

 // for (var checkbox of checkboxes) {
 //     checkbox.disabled = value;
 // }

        }
        // END CHANEL

        personaButton.addEventListener('click', nextStep);
    }
}());
// END SORAYA
