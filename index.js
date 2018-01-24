(function allInOne() {
  var inputForm = document.getElementById('searchTerm');
  var searchButton = document.getElementById('searchButton');

  inputForm.addEventListener('input', function () {
    inputForm.style = "border: 0.15em solid #295e89;"
    var inputSize = inputForm.value.length;
    if (12 < inputSize ) {
      inputForm.size = inputSize;
    }
    return
  });

  inputForm.addEventListener('onkeydown', function() {
    if (event.keyCode==13) {
      searchClick();
    }
    return
  });

  searchButton.addEventListener('click', function () {
    searchClick(searchTerm);
  });

  function searchClick(searchTerm){
    var searchBox = document.getElementById('searchBox').className = "active"
    var searchTerm = document.getElementById('searchTerm').value;
    var output = document.getElementById('output');
    var url ="https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + searchTerm;

    output.innerHTML = "";
    fetch(url, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
        for (var i = 0; i < myJson[1].length; i++) {
          var eachOutput = document.createElement('div');
          eachOutput.className = 'eachOutput'
          var link = document.createElement('a');
          link.innerHTML = myJson[1][i];
          link.href = myJson[3][i];
          eachOutput.appendChild(link);
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
