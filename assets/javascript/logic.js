// Declare Global Variables Here
var keyAPI = "api_key=41KGysPWerlj4WWkV9j4sQhwH5Q8OWmZ";
var urlAPI = "https://api.giphy.com/v1/gifs/search?";
var limitAPI = "limit=10";
var offsetAPI = 0;
var isGifInfo = "false";
var btnIndex = 0;
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
    $(".more").remove();

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function(response){
        var gif = response.data;
        console.log(response);
        for (var i = 0; i<gif.length; i++){
            var imageStill = gif[i].images.fixed_height_still.url;
            var imageAnimate = gif[i].images.fixed_height.url;
            var imgRating = gif[i].rating;

            var newDiv = $("<div>");
            newDiv.addClass("gifDiv");
            newDiv.attr("style", "float: left; margin: 2vh 1vw 1vh 1vw");
            var newTag = $("<p>");
            newTag.html("<h5>Rating: " + imgRating + "</h5>");
            var newImg = $("<img>");
            newImg.attr("data-still", imageStill);
            newImg.attr("data-animate", imageAnimate);
            newImg.attr("src", imageStill);
            newImg.addClass("gif");
            newImg.attr("id", "gif-" + (offsetAPI+i));
            newDiv.append(newImg);
            if(isGifInfo){
                var imgTitle = $("<p>");
                var imgSrc = $("<p>");
                imgTitle.html("<h5>Title: " + gif[i].title + "</h5>");
                imgSrc.html("<h5>Originally Found at: " + gif[i].source_tld + "</h5>");
                newDiv.append(imgTitle);
                newDiv.append(imgSrc);
            }
            newDiv.append(newTag);
            $(".imgArray").prepend(newDiv);   
        }
        var newBtn = $("<button>");
        newBtn.text("More Gifs!");
        newBtn.addClass("more btn-outline-secondary");
        $(".form-inline").append(newBtn);
    });
}
// Main Program Starts Here
for(var i=0; i<userData.keywords.length; i++){
    var newBtn = $("<button>")
    newBtn.text(userData.keywords[i]);
    newBtn.attr("id", "char-" + i);
    newBtn.addClass("char");
    newBtn.attr("style", "margin: 1vh 0.5vw 1vh 0.5vw")
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
                newBtn.attr("style", "margin: 1vh 0.5vw 1vh 0.5vw")
                newBtn.addClass("char");
                $(".btnBanner").append(newBtn);
                userData.add(hero);
                $("#search").val("")
            }   
        }
        // Clearing the Page of gifs/ images
        else if(event.target.type === "reset"){
            $(".imgArray").empty();
        }
        // Toggle Displaying extra Gif Info
        if(event.target.id === "infoToggle"){
            if(isGifInfo) {
                isGifInfo = false;
                console.log(isGifInfo);

            }
            else if(!isGifInfo) {
                isGifInfo = true;
                console.log(isGifInfo);
            }
        }
    });
    $(document).on("click", ".char", function(){
        btnIndex = this.id.slice(5);
        $(".imgArray").empty();
        offsetAPI = 0;
        getGifs(btnIndex);
    });
    $(document).on("click", ".gif", function(event){
        var imgId = "#" + event.target.id;
        var imgStill = $(imgId).attr("data-still");
        var imgAnimate = $(imgId).attr("data-animate");
        var imgSource = $(imgId).attr("src");
        if (imgSource === imgStill) $(imgId).attr("src", imgAnimate);
        else if (imgSource === imgAnimate) $(imgId).attr("src", imgStill);
    });
    $(document).on("click", ".more", function(){
        $(".more").remove();
        offsetAPI +=10;
        getGifs(btnIndex);
    });
});