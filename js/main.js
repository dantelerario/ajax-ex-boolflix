
$(document).ready( function() {
  var moviesList = $('.moviesContainer')
  var boxSearch = $('.boxSearch');
  var btnSearch = $('.btnSearch');

  // loading API and search
  btnSearch.on('click', function() {
    moviesList.empty();
    var searchInput = boxSearch.val().trim().toLowerCase();
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: '80fa425ed2ac212a9eb2eafb6396d967',
        language: 'it-IT',
        query: searchInput,
      },
      success: function(data) {
        var moviesSuccessList = data.results;
        // HANDLEBARS
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        console.log(data.results); //debug
        for (i = 0; i < moviesSuccessList.length; i++) {
          var movies = moviesSuccessList[i];
          var starVote = (movies.vote_average / 2);
          var roundStarVote = Math.round(starVote);
          if (movies.original_language === 'en') {
            var flagLanguage = "";
          } else if (movies.original_language === 'it') {
            var flagLanguage = "";
          } else {
            var flagLanguage = tv.original_language;
          }
          var results = {
            title: movies.title,
            original_title: movies.original_title,
            original_language: flagLanguage,
            vote_average: roundStarVote,
            type: 'MOVIE',
          }
          var htmlMoviesList = template(results);
          console.log(results);
          moviesList.append(htmlMoviesList);
        }
        boxSearch.val('');
      },
      error: function() {
        console.log('ERROR');
      },
    });
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/tv',
      method: 'GET',
      data: {
        api_key: '80fa425ed2ac212a9eb2eafb6396d967',
        language: 'it-IT',
        query: searchInput,
      },
      success: function(data) {
        var tvSuccessList = data.results;
        // HANDLEBARS
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        console.log(data.results); //debug
        for (i = 0; i < tvSuccessList.length; i++) {
          var tv = tvSuccessList[i];
          var starVote = (tv.vote_average / 2);
          var roundStarVote = Math.round(starVote);
            if (tv.original_language === 'en') {
              var flagLanguage = "";
            } else if (tv.original_language === 'it') {
              var flagLanguage = "";
            } else {
              var flagLanguage = tv.original_language;
            }
          var results = {
            title: tv.name,
            original_title: tv.original_name,
            original_language: flagLanguage,
            vote_average: roundStarVote,
            type: 'TV',
          }
          var htmlTvList = template(results);
          console.log(results);
          moviesList.append(htmlTvList);
        }
        boxSearch.val('');
      },
      error: function() {
        console.log('ERROR');
      },
    });
  });
}); /* END DOCUMENT */


//  FUNCTIONS
