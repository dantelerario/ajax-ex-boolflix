
$(document).ready( function() {
  // var moviesList = $('.moviesContainer')
  var boxSearch = $('.boxSearch');
  var btnSearch = $('.btnSearch');


  // loading API and search
  // button click
  btnSearch.on('click', function() {
    var moviesList = $('.moviesContainer')
    moviesList.empty();
    var searchInput = boxSearch.val().trim().toLowerCase();

    ajaxCall(searchInput);
  });
  // keyup
  boxSearch.keyup(function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      var moviesList = $('.moviesContainer')
      moviesList.empty();
      var inputList = boxSearch.val().trim();
      var searchInput = boxSearch.val().trim().toLowerCase();

        if (inputList.length > 0) {
          ajaxCall(searchInput);
        }
    }
  });
}); /* END DOCUMENT */


//  FUNCTIONS
function addStars(vote) {
  var fullStar = '<i class="fas fa-star-half"></i>';
  var noStar = '<i class="far fa-star-half"></i>';
  var addIcon = '';

  var starVote = (vote / 2);
  var roundStarVote = Math.round(starVote);
  vote = roundStarVote;

  for (var i = 0; i < 5; i++) {
    if (vote > i) {
      addIcon += fullStar;
    } else {
      addIcon += noStar;
    }
  }
  return addIcon;
}

function ajaxCall(query) {
  var apis = {
    api1: 'https://api.themoviedb.org/3/search/movie',
    api2: 'https://api.themoviedb.org/3/search/tv',
  };
  for (var key in apis) {
    $.ajax({
      url: apis[key],
      method: 'GET',
      data: {
        api_key: '80fa425ed2ac212a9eb2eafb6396d967',
        language: 'it-IT',
        query: query,
      },
      success: function(data) {
        if (apis = 'https://api.themoviedb.org/3/search/movie') {
          var moviesList = $('.moviesContainer')
          var moviesSuccessList = data.results;
          // HANDLEBARS
          var source = $('#template').html();
          var template = Handlebars.compile(source);
          console.log(data.results); //debug
          for (i = 0; i < moviesSuccessList.length; i++) {
            var movies = moviesSuccessList[i];
            if (movies.original_language === 'en') {
              var flagLanguage = '<img src="img/en.svg">';
            } else if (movies.original_language === 'it') {
              var flagLanguage = '<img src="img/it.svg">';
            } else {
              var flagLanguage = tv.original_language;
            }
            var results = {
              title: movies.title,
              original_title: movies.original_title,
              original_language: flagLanguage,
              vote_average: addStars(movies.vote_average),
              type: 'MOVIE',
            }
            var htmlMoviesList = template(results);
            console.log(results);
            moviesList.append(htmlMoviesList);
          }
          var boxSearch = $('.boxSearch');
          boxSearch.val('');
        } else if (apis = 'https://api.themoviedb.org/3/search/tv') {
              var moviesList = $('.moviesContainer')
              var tvSuccessList = data.results;
              // HANDLEBARS
              var source = $('#template').html();
              var template = Handlebars.compile(source);
              console.log(data.results); //debug
              for (i = 0; i < tvSuccessList.length; i++) {
                var tv = tvSuccessList[i];
                  if (tv.original_language === 'en') {
                    var flagLanguage = '<img src="img/en.svg">';
                  } else if (tv.original_language === 'it') {
                    var flagLanguage = '<img src="img/it.svg">';
                  } else {
                    var flagLanguage = tv.original_language;
                  }
                var results = {
                  title: tv.name,
                  original_title: tv.original_name,
                  original_language: flagLanguage,
                  vote_average: addStars(tv.vote_average),
                  type: 'TV',
                }
                var htmlTvList = template(results);
                console.log(results);
                moviesList.append(htmlTvList);
              }
              var boxSearch = $('.boxSearch');
              boxSearch.val('');
            }
          },
        error: function() {
          console.log('ERROR');
        },
    });
  }

  // $.ajax({
  //   url: 'https://api.themoviedb.org/3/search/movie',
  //   method: 'GET',
  //   data: {
  //     api_key: '80fa425ed2ac212a9eb2eafb6396d967',
  //     language: 'it-IT',
  //     query: query,
  //   },
  //   success: function(data) {
  //     var moviesList = $('.moviesContainer')
  //     var moviesSuccessList = data.results;
  //     // HANDLEBARS
  //     var source = $('#template').html();
  //     var template = Handlebars.compile(source);
  //     console.log(data.results); //debug
  //     for (i = 0; i < moviesSuccessList.length; i++) {
  //       var movies = moviesSuccessList[i];
  //       if (movies.original_language === 'en') {
  //         var flagLanguage = '<img src="img/en.svg">';
  //       } else if (movies.original_language === 'it') {
  //         var flagLanguage = '<img src="img/it.svg">';
  //       } else {
  //         var flagLanguage = tv.original_language;
  //       }
  //       var results = {
  //         title: movies.title,
  //         original_title: movies.original_title,
  //         original_language: flagLanguage,
  //         vote_average: addStars(movies.vote_average),
  //         type: 'MOVIE',
  //       }
  //       var htmlMoviesList = template(results);
  //       console.log(results);
  //       moviesList.append(htmlMoviesList);
  //     }
  //     var boxSearch = $('.boxSearch');
  //     boxSearch.val('');
  //   },
  //   error: function() {
  //     console.log('ERROR');
  //   },
  // });
  // $.ajax({
  //   url: 'https://api.themoviedb.org/3/search/tv',
  //   method: 'GET',
  //   data: {
  //     api_key: '80fa425ed2ac212a9eb2eafb6396d967',
  //     language: 'it-IT',
  //     query: query,
  //   },
  //   success: function(data) {
  //     var moviesList = $('.moviesContainer')
  //     var tvSuccessList = data.results;
  //     // HANDLEBARS
  //     var source = $('#template').html();
  //     var template = Handlebars.compile(source);
  //     console.log(data.results); //debug
  //     for (i = 0; i < tvSuccessList.length; i++) {
  //       var tv = tvSuccessList[i];
  //         if (tv.original_language === 'en') {
  //           var flagLanguage = '<img src="img/en.svg">';
  //         } else if (tv.original_language === 'it') {
  //           var flagLanguage = '<img src="img/it.svg">';
  //         } else {
  //           var flagLanguage = tv.original_language;
  //         }
  //       var results = {
  //         title: tv.name,
  //         original_title: tv.original_name,
  //         original_language: flagLanguage,
  //         vote_average: addStars(tv.vote_average),
  //         type: 'TV',
  //       }
  //       var htmlTvList = template(results);
  //       console.log(results);
  //       moviesList.append(htmlTvList);
  //     }
  //     var boxSearch = $('.boxSearch');
  //     boxSearch.val('');
  //   },
  //   error: function() {
  //     console.log('ERROR');
  //   },
  // });
}
