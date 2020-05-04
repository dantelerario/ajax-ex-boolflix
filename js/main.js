
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
          var results = {
            title: movies.title,
            original_title: movies.original_title,
            original_language: movies.original_language,
            vote_average: movies.vote_average,
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
  });
}); /* END DOCUMENT */


//  FUNCTIONS
