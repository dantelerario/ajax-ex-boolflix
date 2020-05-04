
$(document).ready( function() {
  var moviesList = $('.moviesContainer')
  var boxSearch = $('.boxSearch');
  var btnSearch = $('.btnSearch');
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
        // HANDLEBARS
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        var htmlMoviesList = template(data.results);
        moviesList.append(htmlMoviesList);
        console.log(data.results);
      },
      error: function() {
        console.log('ERROR');
      },
    });
  });
}); /* END DOCUMENT */


//  FUNCTIONS
