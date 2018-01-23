(function allInOne() {
  var searchTerm;
  var searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function(){
    searchClick(searchTerm);
    console.log('click!!');
  });

  function searchClick(searchTerm){
    var searchTerm = document.getElementById('searchTerm').value;
    var url ="https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + searchTerm;
    console.log(url);
    fetch(url, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      var output = document.getElementById('output');
      for (var i = 0; i < myJson[1].length; i++) {
        var node = document.createElement('li');

        node.appendChild(myJson[3][i]);
        output.appendChild(node);
        // output.prepend('<li><a href="${myJson[3][i]}"> + ${myJson[1][i]}</a> + <p>${myJson[2][i]}</p></li>');
      };
      console.log(output);
    }).catch(function (error) {
      console.log(error);
    });
  }
})();
