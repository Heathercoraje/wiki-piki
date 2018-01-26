(function allInOne() {
  var inputForm = document.getElementById('inputForm');
  var searchButton = document.getElementById('searchButton');
  var searchBox = document.getElementById('searchBox');
  var languageButton = document.getElementById('languageButton');
  var languageInput = document.getElementById('languageInput');
  var langLinks = "https://en.wikipedia.org/w/api.php?action=query&format=json&titles=Cloud&prop=langlinks&lllimit=500&origin=*"
  var base = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search="
  var keyword;

  // generate lang options once loaded
  (function fetchLangs () {
    fetch(langLinks, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      var languagesList = document.getElementById('languagesList');
      var langList = myJson.query.pages["47515"].langlinks;
      langList.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item["lang"];
        languagesList.appendChild(option);
      });
    }).catch(function (error) {
      console.log(error);
    });
  })();

// language icon toggles input display setting
  languageButton.addEventListener('click', function () {
    languageInput.classList.toggle('display');
  });

// automatically adjust input field size if it becomes bigger than 14
  inputForm.addEventListener('input', function () {
    var inputSize = inputForm.value.length;
    if (14 < inputSize ) {
      inputForm.size = inputSize;
    }
    //auto-suggest keywords
    (function autoSuggest () {
      var suggestionList = document.getElementById('suggestionList')
      var value = inputForm.value;
      var url = (languageInput.value) ? base.replace('en', languageInput.value) + value : base + value;
      fetch(url, {
        method: 'GET'
      }).then(function (response) {
        return response.json();
      }).then(function (myJson) {
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

  // when press enter instead of click searchButton, execute search function
  inputForm.addEventListener('keydown', function() {
    if (event.keyCode == 13) {
      keyword = inputForm.value;
      searchClick(keyword);
    }
    return
  });

  // take user to a random article when clicking questionButton
  randomButton.addEventListener('click', function () {
    location.href= "https://en.wikipedia.org/wiki/Special:Random";
  });

  // core search function below
  searchButton.addEventListener('click', function () {
    keyword = inputForm.value;
    searchClick(keyword);
  });

  function searchClick (keyword) {
    var searchBox = document.getElementById('searchBox');
    var output = document.getElementById('output');
    var url = (languageInput.value) ? base.replace('en', languageInput.value) + keyword : base + keyword;

    if (!keyword) {
      alert("Enter a search term!")
    }
    else {
      searchBox.className = "active"
      output.innerHTML = ""; //clear output container beforehand
      fetch(url, {
        method: 'GET'
      }).then(function (response) {
        return response.json();
      }).then(function (myJson) {
        for (var i = 0; i < myJson[1].length; i++) {
          var eachOutput = document.createElement('a');
          eachOutput.href = myJson[3][i];
          eachOutput.target ="_blank"
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
  }
})();
