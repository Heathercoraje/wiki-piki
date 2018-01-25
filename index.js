(function allInOne() {
  var inputForm = document.getElementById('inputForm');
  var searchButton = document.getElementById('searchButton');
  var base = "https://es.wikipedia.org/w/api.php?origin=*&action=opensearch&search="

  inputForm.addEventListener('input', function () {
    var inputSize = inputForm.value.length;
    if (14 < inputSize ) {
      inputForm.size = inputSize;
    }
    (function autoSuggest (value) {
      var suggestionList = document.getElementById('suggestionList')
      var value = inputForm.value;
      var url = base + value;
      fetch(url, {
        method: 'GET'
      }).then(function (response){
        return response.json();
      }).then(function (myJson){
        var wordList = myJson[1];
        suggestionList.innerHTML= "";
        wordList.forEach(function (item) {
          var option = document.createElement('option');
          option.value = item;
          suggestionList.appendChild(option);
        });
      }).catch(function (error) {
        console.log(error);
      });
    })();
  });


  inputForm.addEventListener('keydown', function() {
    if (event.keyCode == 13) {
      console.log('enterkey pressed: execute function');
      var keyword = inputForm.value;
      searchClick(inputForm);
    }
    return
  });

  searchButton.addEventListener('click', function () {
    searchClick(inputForm);
  });

  randomButton.addEventListener('click', function () {
    location.href= "https://en.wikipedia.org/wiki/Special:Random";
  });

  function searchClick(inputForm){
    var searchBox = document.getElementById('searchBox').className = "active"
    var keyword = inputForm.value;
    var output = document.getElementById('output');
    var url = base + keyword;
console.log(url);
    output.innerHTML = ""; //clear output container beforehand
    fetch(url, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
        for (var i = 0; i < myJson[1].length; i++) {
          var eachOutput = document.createElement('a');
          eachOutput.href = myJson[3][i];
          eachOutput.className = 'eachOutput'
          var title = document.createElement('li')
          title.innerHTML = myJson[1][i];
          title.style ="font-weight:bold;"
          eachOutput.appendChild(title);
          var desc = document.createElement('li');
          desc.innerHTML = myJson[2][i];
          eachOutput.appendChild(desc);
          output.appendChild(eachOutput);
        };
    }).catch(function (error) {
      console.log(error);
    });
  }
})();
