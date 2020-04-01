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
                $(clearFields())
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
                    return "<span>" + movie.title + " | " + movie.director + " | " + movie.genre + " </span><input id='movie-id' type='text' name='movieId' class='form-control invis' value='"+ movie.movieId + "'/><button class='btn btn-sm btn-success' type='submit' style='margin-left:5px' onclick='showEditContainer()'>Edit</button>";
                }).join("<br>")}`);
            },
            error : function( jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    $('#search-box').submit(processSearch);
})(jQuery);

(function($){

    function processGetById( e ){
        var search = {
            MovieId : this["movie-id"].value
        }

        $.ajax({
            url: `https://localhost:44325/api/movie/${this["movie-id"].value}`,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(search),
            success: function( data, textStatus, jQxhr) {
                $('#edit-Id').val(data.movieId);
                $('#edit-Title').val(data.title);
                $('#edit-Director').val(data.director);
                $('#edit-Genre').val(data.genre);
            },
            error : function( jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    $('#response').submit( processGetById);
})(jQuery);

(function($){

    function processEdit( e ){
        var dict = {
            MovieId : parseInt(this["editId"].value),
            Title : this["editTitle"].value,
            Director : this["editDirector"].value,
            Genre : this["editGenre"].value
        }

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr) {
                $('#response-to-edit pre').html(`${data.title} has been updated successfully!`);
                $('#response-to-edit').removeClass("invis");
                $(clearFieldsEdit())
            },
            error : function( jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    $('#editForm').submit( processEdit);
})(jQuery);

function displayAddForm() {
    document.getElementById("add-form").classList.remove("invis");
    runScrollToAdd();
}

function showEditContainer() {
    document.getElementById("editContainer").classList.remove("invis");
    runScrollToEdit();
}

function closeAlert() {
    document.getElementById("response-to-add").classList.add("invis");
}

function closeAlertEdit() {
    document.getElementById("response-to-edit").classList.add("invis");
}

function clearFields() {
    document.getElementById("inputTitle").value="";
    document.getElementById("inputDirector").value="";
    document.getElementById("inputGenre").value="";
}

function clearFieldsEdit() {
    document.getElementById("edit-Title").value="";
    document.getElementById("edit-Director").value="";
    document.getElementById("edit-Genre").value="";
}

var myBtn = document.getElementById("backToTopBtn");
window.onscroll = function() { scrollFunction()};

function scrollFunction() {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myBtn.style.display = "block";
        
    } else {
        myBtn.style.display = "none";
    }
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var runScrollToAdd = null;
var runScrollToEdit = null;


$(function() {
    function scrollToEdit() {
        $('html, body').animate({
            scrollTop: $("#editContainer").offset().top
        }, 800);
    }
    function scrollToAdd() {
        $('html, body').animate({
            scrollTop: $("#add-form").offset().top
        }, 800);
    }
    runScrollToEdit = scrollToEdit;
    runScrollToAdd = scrollToAdd;
});