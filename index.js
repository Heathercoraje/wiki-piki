(function allInOne() {
  var inputForm = document.getElementById('inputForm');
  var searchButton = document.getElementById('searchButton');

  inputForm.addEventListener('input', function () {
    inputForm.style = "border: 0.15em solid #295e89;"
    var inputSize = inputForm.value.length;
    if (14 < inputSize ) {
      inputForm.size = inputSize;
    }
    return
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
    var url ="https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + keyword;

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
