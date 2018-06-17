// Declare Global Variables Here
var keyAPI = "api_key=41KGysPWerlj4WWkV9j4sQhwH5Q8OWmZ";
var urlAPI = "https://api.giphy.com/v1/gifs/search?";
var limitAPI = "limit=10";
var offsetAPI = 0;
var isGifInfo = "false";
var userData = {
    newQuery: "",
    keywords: [
        "Thor",
        "Captian America",
        "Iron Man",
        "Black Panter",
        "Green Lantern",
        "Batman",
        "Superman",
        "Wonder Woman",
        "Aquaman",
        "The Flash"
    ],
    convert(string){
        var newString = "";
        for(var i=0; i<string.length; i++){
            var char = string.charAt(i);
            if( char === " "){
                newString += "+";
            }
            else {
                newString += char;
            }
        }
        return newString;
    },
    add(string){
        this.keywords.push(string);
    },
}
// Declare and Define Functions Here
function getGifs(index){
    var a = "&";
    query = "q=" + userData.convert(userData.keywords[index]);
    var offset = "offset=" + offsetAPI;
    var queryUrl = urlAPI + query + a + limitAPI + a + offset + a + keyAPI;
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function(response){
        console.log(response);
        var gif = response.data;

        for (var i = 0; i<gif.length; i++){
            var imageStill = gif[i].images.fixed_height_still.url;
            var imageAnimate = gif[i].images.fixed_height.url;
            var imgRating = gif[i].rating;

            var newDiv = $("<div>");
            var newTag = $("<p>");
            newTag.html("<h5>Rating: " + imgRating + "</h5>");
            var newImg = $("<img>");
            newImg.attr("data-still", imageStill);
            newImg.attr("data-animate", imageAnimate);
            newImg.attr("src", imageStill);
            newImg.addClass("gif");
            newImg.attr("gif- " + i);
            newDiv.append(newTag);
            newDiv.append(newImg);
            $(".imgArray").prepend(newDiv);
            console.log(newDiv);
        }
    });
}
// Main Program Starts Here
for(var i=0; i<userData.keywords.length; i++){
    var newBtn = $("<button>")
    newBtn.text(userData.keywords[i]);
    newBtn.attr("id", "char-" + i);
    newBtn.addClass("char");
    $(".btnBanner").append(newBtn);
}
$(document).ready(function(){
    // Click Handler for button presses
    $(document).on("click", "button", function(event){
        event.preventDefault();
        // Adding a button from User Input
        if(event.target.type === "submit"){
            var hero = $("#search").val().trim();
            if (hero != ""){
                var newBtn = $("<button>").text(hero);
                newBtn.attr("id", "char-" + userData.keywords.length);
                newBtn.addClass("char");
                $(".btnBanner").append(newBtn);
                userData.add(hero);
                $("#search").val("")
            }   
        }
        // Clearing the Page of gifs/ images
        else if(event.target.type === "reset"){
            console.log(this);
        }
        // Toggle Displaying extra Gif Info
        else if(event.target.type === "input"){
            console.log(this);
        }
    });
    $(document).on("click", ".char", function(){
        var btnIndex = this.id.slice(5);
        getGifs(btnIndex);
    });
})