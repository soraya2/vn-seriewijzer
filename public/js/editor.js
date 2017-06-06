(function() {
  'use strict';
  console.log('JS Loaded');

  var form = document.getElementById('review-form');
  var review = document.getElementById('review');
  var editor = document.getElementById('editor');

  var quill = new Quill('#editor', {
    modules: { toolbar: true },
    theme: 'snow'
  });

  function fillReviewArea () {
    var content = editor.children[0].innerHTML;
    review.innerHTML = content;
    console.log(content);
  };


  form.addEventListener('submit', function () {
    fillReviewArea();
  })

}());
