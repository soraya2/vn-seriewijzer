// BEGIN SORAYA
(function() {
    //    if (document.getElementsByTagName('persona-check')) {
    var personaSteps = document.getElementsByClassName('persona-check'),
        personaButton = document.getElementById('persona-button'),
        personaSubmit = document.getElementById('persona-submit'),
        count = 1,
        i,
        index;
    // Hiding submit button untill the last step;
    personaButton.removeAttribute('hidden');

    // BEGIN CHANEL
    function toggleCheckboxes(el, value) {
        var checkboxes = document.querySelectorAll('.persona-check:nth-of-type(' + (el + 1) + ') input[type="checkbox"]');

        for (var b = 0; b < checkboxes.length; b++) {
            checkboxes[b].disabled = value;
        }
    }

    var classes = {
        add: function(el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },
        remove: function(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(' ' + className, '');
            }
        }
    };
    // END CHANEL

    //hide all sections except the first
    for (i = 1; i < personaSteps.length; i++) {
        classes.add(personaSteps[i], 'fade-in');
        classes.add(personaSteps[i], 'fade-out');
        classes.add(personaSteps[i], 'to-back');

        toggleCheckboxes(i, true);
    }

    classes.add(personaSteps[0], 'fade-in');

    function nextStep(e) {
        e.preventDefault();

        switch (count) {
            case 1:
                classes.add(personaSteps[0], 'fade-out');
                classes.remove(personaSteps[count], 'fade-out');

                toggleCheckboxes(0, true);
                toggleCheckboxes(count, false);

                break;
            case 2:
                personaSubmit.className = ' submit-persona';
                personaButton.className += ' hide';

                for (index = 0; index < personaSteps.length; index++) {
                    //BEGIN CHANEL
                    var sub = 'fade-out';

                    //If item doesn't have 'fade-out', add it
                    if (personaSteps[index].className.indexOf(sub) == -1) {
                        classes.add(personaSteps[index], 'fade-out');
                    }
                    //END CHANEL
                    toggleCheckboxes(index, true);
                }

                classes.remove(personaSteps[count], 'fade-out');

                toggleCheckboxes(count, false);
        }

        return personaSteps[count++];
    }

    personaButton.addEventListener('click', nextStep);
    //    }
})();
// END SORAYA
