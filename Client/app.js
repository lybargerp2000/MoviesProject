(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response-to-add pre').html(`${data.title} has been added to the database!`);
                $('#response-to-add').removeClass("invis");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);

(function($){

    function processSearch( e ){
        var search = {
            Title : this["search"].value,
            Director : this["search"].value,
            Genre: this["search"].value
        }

        $.ajax({
            url: `https://localhost:44325/api/movie/${this["search"].value}`,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(search),
            success: function( data, textStatus, jQxhr) {
                $('#response pre').html(`${data.map(function(movie){
                    return movie.title + " | " + movie.director +  " | " + movie.genre
                }).join("<br>")}`);
            },
            error : function( jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    $('#search-box').submit( processSearch);
})(jQuery);

function displayAddForm() {
    document.getElementById("searchBox").classList.remove("invis");
}

function closeAlert() {
    document.getElementById("response-to-add").classList.add("invis");
}