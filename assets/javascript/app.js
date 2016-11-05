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

				var musicianSlugData = results[i].slug;

				var image = $('<img>')
				rating.append(image);

				image.addClass('musicianImage').attr('src', results[i].images.fixed_height_still.url).attr('data-state', 'still').attr('data-animate', results[i].images.fixed_height.url).attr('data-still', results[i].images.fixed_height_still.url);
			}
		});
	}


	$('#addGiphy').on('click', function(){

		var musicianInput = $('#giphy-input').val().trim();
		musicians.push(musicianInput);

		renderButtons();

		return false;

	})

	$(document).on('click', '.musicianImage', function(){
    // console.log("OUCH!")

		var state = $(this).attr('data-state')

            if (state === 'animate') {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }

            else if (state !== 'animate') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
    });

	renderButtons();

	$(document).on('click', '.musician', refAndRenderGifs);

