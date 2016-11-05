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
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + musician + "&api_key=dc6zaTOxFJmzC&limit=1";


        $.ajax({
                url: queryURL,
                method: 'GET'
            })

        .done(function(response) {
			console.log(response);

  			var results = response.data;


			var musicianDiv = $("#giphyView").append('<div>');

			var musicianSlugData = results[0].slug;
			var musicianSlug = $(musicianDiv).append('<div>');
			musicianDiv.append('<h3><b>Title: </b>' + musicianSlugData + '</h3>');

			var ratingData = results[0].rating;
			var rating = $(musicianSlug).append('<div>');
			rating.append('<h4><b>Rating: </b>' + ratingData + '</h4>');

			var image = $('<img>')
			image.attr('src', results[0].images.fixed_height.url);
			rating.append(image);


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

