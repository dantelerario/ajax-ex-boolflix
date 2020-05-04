
$(document).ready( function() {
  var moviesList = $('.moviesContainer')
  var boxSearch = $('.boxSearch');
  var btnSearch = $('.btnSearch');
  // HANDLEBARS
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  // loading API and search
  btnSearch.on('click', function() {
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
        console.log(data.results);
        for (i = 0; i < moviesSuccessList.length; i++) {
          var movies = moviesSuccessList[i];
          var results = {
            poster_path: movies.poster_path,
            title: movies.title,
            original_title: movies.original_title,
            original_language: movies.original_language,
            vote_average: movies.vote_average,
          }
        }
          var htmlMoviesList = template(results.results);
          console.log(results.results);
          moviesList.append(htmlMoviesList);
      },
      error: function() {
        console.log('ERROR');
      },
    });
  });
}); /* END DOCUMENT */


//  FUNCTIONS
