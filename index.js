(function allInOne() {
  var searchTerm;
  var searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function(){
    searchClick(searchTerm);
    console.log('click!!');
  });

  function searchClick(searchTerm){
    var searchBox = document.getElementById('searchBox').className = "active"
    var searchTerm = document.getElementById('searchTerm').value;
    var output = document.getElementById('output');
    var url ="https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + searchTerm;

    fetch(url, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      output.innerHTML = "";
      for (var i = 0; i < myJson[1].length; i++) {
        var eachOutput = document.createElement('div');
        var link = document.createElement('a');
        link.innerHTML = myJson[1][i];
        link.href = myJson[3][i];
        eachOutput.appendChild(link);
        var desc = document.createElement('li');
        desc.innerHTML = myJson[2][i];
        eachOutput.appendChild(desc);
        output.appendChild(eachOutput);
      };
      console.log(output);
    }).catch(function (error) {
      console.log(error);
    });
  }
})();


var inputForm = document.getElementById('searchTerm');

inputForm.addEventListener('input', function() {
  var inputSize = inputForm.value.length;
  if (12 < inputSize ) {
    inputForm.size = inputSize;
  }
  return
});
