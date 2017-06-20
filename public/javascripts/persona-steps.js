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
            add: function(el, className){
                if(el.classList){
                    el.classList.add(className);
                } else {
                    el.className += ' ' + className;
                }
            },
            remove: function(el, className){
                if(el.classList){
                    el.classList.remove(className);
                } else {
                    el.className = el.className.replace(' ' + className, '');
                }
            }
        }

        var checkedInputs = {
            get: function(){
                var allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked + div + p label');

                for(var d = 0; d < allCheckboxes.length; d++){
                    this.createEl(allCheckboxes[d].innerHTML);
                };
            },
            createEl: function(label){
                console.log('create el');
                var li = document.createElement('li');
                var text = document.createTextNode(label);

                li.appendChild(text);
                this.render(li);
            },
            render: function(el){
                personalList.appendChild(el);
            }
        }
        // END CHANEL

        function nextStep(e) {
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
                    personaSubmit.className = ' submit-persona';

                    for (index = 0; index < personaSteps.length; index++) {
                        //BEGIN CHANEL
                        var sub = 'fade-out';

                        //If item doesn't have 'fade-out', add it
                        if(personaSteps[index].className.indexOf(sub) == -1){
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
                    for(var c = 0; c < personaSteps.length; c++){
                        toggleCheckboxes(c, false);
                    }

                    checkedInputs.get();
                    confirmOverlay.removeAttribute('hidden');
                //END CHANEL
            }

            return personaSteps[count++];
        }

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

        personaButton.addEventListener('click', nextStep);

        for(var f = 0; f < backButtons.length; f++){
            backButtons[f].addEventListener('click', function(e){
                count--;
                count--;
                console.log(count);
                nextStep(e);
            });
        }
//    }
})();
// END SORAYA
