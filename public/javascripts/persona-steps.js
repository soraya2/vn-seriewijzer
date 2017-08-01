/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
// BEGIN SORAYA
(function() {
    var personaSteps = document.getElementsByClassName('persona-check'),
        backButton = document.getElementById('back'),
        confirmBack = document.getElementById('confirm-back'),
        form = document.getElementById('persona-form'),
        personaButton = document.getElementById('persona-button'),
        confirmOverlay = document.getElementById('confirm-persona'),
        personalList = document.getElementById('personal-list'),
        buttonSubmit = document.querySelector('button[type="submit"]'),
        count = 1,
        checkedBoxes = [
            [],
            [],
            []
        ],
        checkboxes,
        b,
        c,
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
        for (c = 0; c < checkboxes.length; c++) {
            checkboxes[c].disabled = value;
        }
    }

    function config() {
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
    //When a user tries to add more than three checkboxes, give feedback
    function addFeedback(e) {
        var section = document.createElement('section');
        var h4 = document.createElement('h4');
        var text = document.createTextNode('Je mag maar drie eigenschappen kiezen!');
        section.setAttribute('class', 'notify');
        h4.appendChild(text);
        section.appendChild(h4);
        e.target.parentNode.appendChild(section);
    }
    //Function that doesn't let you check more than three checkboxes
    function validateFieldset(e) {
        if (checkedBoxes[count - 1].indexOf(e.target) != -1) {
            checkedBoxes[count - 1].splice(checkedBoxes[count - 1].indexOf(e.target), 1);
        } else if (checkedBoxes[count - 1].length > 2) {
            e.target.checked = false;
            addFeedback(e);
        } else {
            checkedBoxes[count - 1].push(e.target);
        }
    }
    //Functions to get all checked checkboxes and render them in a list in confirmation overlay
    function showChoices() {
        var allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked + picture + h3 label');
        var allPictures = document.querySelectorAll('input[type="checkbox"]:checked + picture > img');
        console.log(allPictures);
        for (b = 0; b < allCheckboxes.length; b++) {
            var li = document.createElement('li');
            var label = document.createElement('label');
            var img = document.createElement('img')
            var text = document.createTextNode(allCheckboxes[b].innerHTML);
            img.setAttribute('src', allPictures[b].attributes[0].nodeValue);
            img.setAttribute('alt', allPictures[b].alt);
            label.appendChild(text);
            li.appendChild(img);
            li.appendChild(label);
            personalList.appendChild(li);
        }
    }
    // END CHANEL
    var step = {
        next: function(e) {
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
                    showChoices();
                    confirmOverlay.removeAttribute('hidden');
                    break;
                    //END CHANEL
            }
            return personaSteps[count++];
        },
        //BEGIN CHANEL
        previous: function(e) { //Merge this one with the next step, logic is the same
            //Function that handles the previous button
            e.preventDefault();
            switch (count) {
                case 2:
                    backButton.setAttribute('disabled', '');
                    toggleCheckboxes(1, true);
                    toggleCheckboxes(0, false); //Everthing false except one
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
    };
    form.addEventListener('change', function(e) {
        var notification = document.querySelector('.notify');
        if (notification) {
            notification.parentNode.removeChild(notification);
        }
        var checked = document.querySelectorAll('fieldset:nth-of-type(' + count + ') input[type="checkbox"]:checked');
        if (checked.length < 1) {
            validateFieldset(e);
            personaButton.setAttribute('disabled', '');
        } else {
            validateFieldset(e);
            personaButton.removeAttribute('disabled');
        }
    });
    backButton.addEventListener('click', function(e) {
        step.previous(e);
        if (checkedBoxes[count - 1] && checkedBoxes[count - 1].length >= 1) {
            personaButton.removeAttribute('disabled');
        }
    });
    confirmBack.addEventListener('click', step.previous);
    personaButton.addEventListener('click', function(e) {
        step.next(e);
        if (checkedBoxes[count - 1] && checkedBoxes[count - 1].length < 1) {
            personaButton.setAttribute('disabled', '');
        }
    });
    //END CHANEL
    //node.control.checked = true
    config();
    //    }
})();
// END SORAYA
