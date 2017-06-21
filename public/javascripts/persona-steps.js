// BEGIN SORAYA
(function() {
    //    if (document.getElementsByTagName('persona-check')) {
    var personaSteps = document.getElementsByClassName('persona-check'),
        backButtons = document.getElementsByClassName('go-back'),
        personaButton = document.getElementById('persona-button'),
        personaSubmit = document.getElementById('persona-submit'),
        confirmOverlay = document.getElementById('confirm-persona'),
        personalList = document.getElementById('personal-list'),
        count = 1,
        i,
        index;

    function config(){
        // Hiding submit button untill the last step;
        personaButton.removeAttribute('hidden');

        //hide all sections except the first
        for (i = 1; i < personaSteps.length; i++) {
            classes.add(personaSteps[i], 'fade-in');
            classes.add(personaSteps[i], 'fade-out');
            classes.add(personaSteps[i], 'to-back');

            toggleCheckboxes(i, true);
        }

        classes.add(personaSteps[0], 'fade-in');
    }

    // BEGIN CHANEL
    //Function to disable or enable checkboxes
    function toggleCheckboxes(el, value) {
        var checkboxes = document.querySelectorAll('.persona-check:nth-of-type(' + (el + 1) + ') input[type="checkbox"]');

        for (var b = 0; b < checkboxes.length; b++) {
            checkboxes[b].disabled = value;
        }
    }

    //Functions for adding or removing checkboxes with feature detection
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
    }

    //Functions to get all checked checkboxes and render them in a list in confirmation overlay
    var checkedInputs = {
            get: function() {
                var allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked + div + p label');

                for (var d = 0; d < allCheckboxes.length; d++) {
                    this.createEl(allCheckboxes[d].innerHTML);
                };
            },
            createEl: function(label) {
                console.log('create el');
                var li = document.createElement('li');
                var text = document.createTextNode(label);

                li.appendChild(text);
                this.render(li);
            },
            render: function(el) {
                personalList.appendChild(el);
            }
        }
        // END CHANEL

        var step = {
            next: function(e){
                e.preventDefault();

                switch (count) {
                    case 1:
                        classes.add(personaSteps[0], 'fade-out');
                        classes.remove(personaSteps[count], 'fade-out');

                        toggleCheckboxes(0, true);
                        toggleCheckboxes(count, false);

                        backButtons[0].removeAttribute('hidden');

                        break;
                    case 2:
                        for (index = 0; index < personaSteps.length; index++) {
                            //BEGIN CHANEL
                            //If item doesn't have 'fade-out', add it
                            if (personaSteps[index].className.indexOf('fade-out') == -1) {
                                classes.add(personaSteps[index], 'fade-out');
                            }
                            //END CHANEL
                            toggleCheckboxes(index, true);
                        }

                        classes.remove(personaSteps[count], 'fade-out');

                        toggleCheckboxes(count, false);

                        break;
                        //BEGIN CHANEL
                    case 3:
                        for (var c = 0; c < personaSteps.length; c++) {
                            toggleCheckboxes(c, false);
                        }

                        //Clearing personal list first
                        personalList.innerHTML = '';

                        checkedInputs.get();
                        confirmOverlay.removeAttribute('hidden');
                        //END CHANEL
                }

                return personaSteps[count++];
            },
            //BEGIN CHANEL
            previous: function(e){
                //Function that handles the previous button
                e.preventDefault();

                switch (count) {
                    case 2:
                        backButtons[0].setAttribute('hidden', '');

                        toggleCheckboxes(1, true);
                        toggleCheckboxes(0, false);

                        classes.add(personaSteps[1], 'fade-out');
                        classes.remove(personaSteps[0], 'fade-out');

                        break;
                    case 3:
                        toggleCheckboxes(2, true);
                        toggleCheckboxes(1, false);

                        classes.add(personaSteps[2], 'fade-out');
                        classes.remove(personaSteps[1], 'fade-out');

                        break;
                    case 4:
                        toggleCheckboxes(0, true);
                        toggleCheckboxes(1, true);

                        confirmOverlay.setAttribute('hidden', '');

                        break;
                }

                return personaSteps[count--];
            }
            //END CHANEL
        }

    personaButton.addEventListener('click', step.next);

    for (var f = 0; f < backButtons.length; f++) {
        backButtons[f].addEventListener('click', function(e) {
            console.log(count);
            step.previous(e);
        });
    }

    config();
    //    }
})();
// END SORAYA
