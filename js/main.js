
$(document).ready( function() {
  var moviesList = $('.moviesContainer')
  var boxSearch = $('.boxSearch');
  var btnSearch = $('.btnSearch');
  // loading API and search
  btnSearch.on('click', function() {
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie?api_key=80fa425ed2ac212a9eb2eafb6396d967',
      method: 'GET',
      success: function(data) {
        // HANDLEBARS
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        var htmlMoviesList = template(data.response);
        cdList.append(htmlMoviesList);

      },
      error: function() {
        console.log('ERROR');
      },
    });
  });
}); /* END DOCUMENT */


//  FUNCTIONS
