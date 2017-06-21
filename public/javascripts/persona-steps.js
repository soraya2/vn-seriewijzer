// BEGIN SORAYA
(function() {
    //    if (document.getElementsByTagName('persona-check')) {
    var form = document.getElementsByTagName('form')[0],
        personaSteps = document.getElementsByClassName('persona-check'),
        backButtons = document.getElementsByClassName('go-back'),
        personaButton = document.getElementById('persona-button'),
        personaSubmit = document.getElementById('persona-submit'),
        confirmOverlay = document.getElementById('confirm-persona'),
        personalList = document.getElementById('personal-list'),
        count = 1,
        checkedBoxes = [[], [], []],
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

    //Functions for adding or removing classes with feature detection
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

    //Function that doesn't let you check more than three checkboxes
    function validateFieldset(e){
        if (checkedBoxes[(count-1)].indexOf(e.target) != -1){
            checkedBoxes[(count-1)].splice(checkedBoxes[(count-1)].indexOf(e.target), 1);
        } else if(checkedBoxes[(count-1)].length > 2){
            e.target.checked = false;
        } else {
            checkedBoxes[(count-1)].push(e.target);
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

                        backButtons[0].removeAttribute('disabled');

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
                        backButtons[0].setAttribute('disabled', 'true');

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

    form.addEventListener('change', validateFieldset);
    personaButton.addEventListener('click', function(e){
        e.preventDefault();

        var checked = document.querySelectorAll('fieldset:nth-of-type(' + count + ') input[type="checkbox"]:checked');

        if(checked.length < 1){
            console.log('Je moet minstens 1 item aanklikken');
        } else {
            step.next(e);
        }
    });

    for (var f = 0; f < backButtons.length; f++) {
        backButtons[f].addEventListener('click', function(e) {
            step.previous(e);
        });
    }

    config();
    //    }
})();
// END SORAYA
