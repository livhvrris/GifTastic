var musicians = ['Kanye West', 'Imagine Dragons' , 'Beyonce', 'Regina Spektor' , 'Rihanna', 'X Ambassadors', 'Chance The Rapper'];

	function renderButtons(){ 

		$('#buttonsView').empty();

		for (var i = 0; i < musicians.length; i++){

		    var bttn = $('<button>');
		    bttn.addClass('musician');
		    bttn.attr('data-name', musicians[i]);
		    bttn.text(musicians[i]);
		    $('#buttonsView').append(bttn);
		    
		}
	}


	function refAndRenderGifs(){

		var musician = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + musician + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })

        .done(function(response) {

  			var results = response.data;

            for (var i = 0; i < results.length; i++) {

				var musicianDiv = $("#giphyView").append('<div>');

				var ratingData = results[i].rating;
				var rating = $(musicianDiv).append('<div>');
				rating.append('<h4><b>Rating: </b>' + ratingData + '</h4>');

				var image = $('<img>')
				image.attr('src', results[i].images.fixed_height.url);
				rating.append(image);

				var musicianSlugData = results[i].slug;
				var musicianSlug = image.attr('alt', musicianSlugData);

			}
		});
	}


	$('#addGiphy').on('click', function(){

		var musicianInput = $('#giphy-input').val().trim();
		musicians.push(musicianInput);

		renderButtons();

		return false;

	})

	renderButtons();

	$(document).on('click', '.musician', refAndRenderGifs);

