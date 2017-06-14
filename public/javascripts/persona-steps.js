// BEGIN SORAYA
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
            personaSteps[i].classList.add('fade-in');
            personaSteps[i].classList.add('fade-out');
            personaSteps[i].classList.add('to-back');

            toggleCheckboxes(i, true);
        }

        personaSteps[0].classList.add('fade-in');

        function nextStep(e) {
            e.preventDefault();

            switch (count) {

                case 1:
                    personaSteps[0].classList.add('fade-out');
                    toggleCheckboxes(0, true);
                    personaSteps[count].classList.remove('fade-out');
                    toggleCheckboxes(count, false);

                    break;

                case 2:
                    personaSubmit.className = ' submit-persona';
                    personaButton.classList.add('hide');

                    for (index = 0; index < personaSteps.length; index++) {
                        personaSteps[index].classList.add('fade-out');
                        toggleCheckboxes(index, true);
                    }

                    toggleCheckboxes(count, false);

                    personaSteps[count].classList.remove('fade-out');
            }

            return personaSteps[count++];
        }

        // BEGIN CHANEL
        function toggleCheckboxes(el, value){
            var checkboxes = document.querySelectorAll('.persona-check:nth-of-type(' + (el + 1) + ') input[type="checkbox"]');

            for(var checkbox of checkboxes){
                checkbox.disabled = value;
            }
        }
        // END CHANEL

        personaButton.addEventListener('click', nextStep);
    }
}());
// END SORAYA
