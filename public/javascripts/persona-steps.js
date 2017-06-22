/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

// BEGIN SORAYA
(function() {
    var personaSteps = document.getElementsByClassName('persona-check'),
        backButton = document.getElementById('back'),
        confirmBack = document.getElementById('confirm-back'),
        feedbackEl = document.getElementById('condition'),
        form = document.getElementById('persona-form'),
        personaButton = document.getElementById('persona-button'),
        confirmOverlay = document.getElementById('confirm-persona'),
        personalList = document.getElementById('personal-list'),
        buttonSubmit = document.querySelector('button[type="submit"]'),
        count = 1,
        checkedBoxes = [[], [], []],
        checkboxes,
        b,
        i,
        index;

    //BEGIN CHANEL
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
    };

    //Function to disable or enable checkboxes
    function toggleCheckboxes(el, value) {
        checkboxes = document.querySelectorAll('.persona-check:nth-of-type(' + (el + 1) + ') input[type="checkbox"]');

        for (b = 0; b < checkboxes.length; b++) {
            checkboxes[b].disabled = value;
        }
    }

    function config(){
        //When javascript is executed, these buttons are needed
        personaButton.removeAttribute('hidden');
        backButton.removeAttribute('hidden');

        //This button isn't needed
        buttonSubmit.setAttribute('hidden', '');
        //END CHANEL

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
    //When a user tries to add more than three checkboxes, add animation that gives feedback
    function addAnimation(){
        classes.add(feedbackEl, 'feedback');

        setTimeout(function(){
            classes.remove(feedbackEl, 'feedback');
        }, 5000);
    }

    //Function that doesn't let you check more than three checkboxes
    function validateFieldset(e){
        if (checkedBoxes[count-1].indexOf(e.target) != -1){
            checkedBoxes[count-1].splice(checkedBoxes[count-1].indexOf(e.target), 1);
        } else if(checkedBoxes[count-1].length > 2){
            e.target.checked = false;
            addAnimation();
        } else {
            checkedBoxes[count-1].push(e.target);
        }
    }

    //Functions to get all checked checkboxes and render them in a list in confirmation overlay
    var checkedInputs = {
            get: function() {
                var allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked + div + p label');

                for (b = 0; b < allCheckboxes.length; b++) {
                    this.createEl(allCheckboxes[b].innerHTML);
                }
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
        };
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

                        backButton.removeAttribute('disabled');

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
                        for (b = 0; b < personaSteps.length; b++) {
                            toggleCheckboxes(b, false);
                        }

                        //Clearing personal list first
                        personalList.innerHTML = '';

                        checkedInputs.get();
                        confirmOverlay.removeAttribute('hidden');

                        break;
                        //END CHANEL
                }

                return personaSteps[count++];
            },
            //BEGIN CHANEL
            previous: function(e){//Merge this one with the next step, logic is the same
                //Function that handles the previous button
                e.preventDefault();

                switch (count) {
                    case 2:
                        backButton.setAttribute('disabled', 'true');

                        toggleCheckboxes(1, true);
                        toggleCheckboxes(0, false);//Everthing false except one

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
        };

    form.addEventListener('change', validateFieldset);
    backButton.addEventListener('click', function(e) {
        step.previous(e);
    });
    confirmBack.addEventListener('click', function(e) {
        step.previous(e);
    });
    personaButton.addEventListener('click', function(e){
        e.preventDefault();

        var checked = document.querySelectorAll('fieldset:nth-of-type(' + count + ') input[type="checkbox"]:checked');
        //node.control.checked = true
        //schrijf je code zo dat wanneer je html veranderd je script nog steeds werkt

        if(checked.length < 1){
            addAnimation();
        } else {
            step.next(e);
        }
    });

    config();
    //    }
})();
// END SORAYA
