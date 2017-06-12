(function(){
    //var items = document.querySelectorAll('.item');
    var checkboxes = document.querySelectorAll('[type="checkbox"]');

    checkboxes.forEach(function(checkbox){
        checkbox.addEventListener('click', function(){
            if(checkbox.checked){
                checkbox.parentElement.classList.add('select-color');
            }
            if(!checkbox.checked){
                checkbox.parentElement.classList.remove('select-color');
            }
        });
    });
})();
