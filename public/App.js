/**
 * Stores home location
 * @type {Object}
 */



/** 
 * geo weather
 *Fuction that changes the homeloc div.
 *If the it is able to get the cordinates of the user then it will send it to the temp and summary div
 *Else it will say an error message if an error occurs
 */
function geo() {
    /**
     * variable to get home location
     * @type {String}
     */
    var apiKey = "";
    var url = 'https://api.forecast.io/forecast/';

    navigator.geolocation.getCurrentPosition(success, error);
    /**
     * success functions that returns the temp and summary from the forecast
     * @param  {int} position Stores coordinate location info
     */
    function success(position) {
        var homecoor = {}
        homecoor["lat"] = position.coords.latitude;
        homecoor["long"] = position.coords.longitude;
        google.maps.event.addDomListener(window, 'load', theMap(homecoor["lat"], homecoor["long"]));
    }
    /** 
     * error message
     */
    function error() {
        msg.innerHTML = "Unable to retrieve your location. Please turn on location.";
    }
}
geo();
/**
 * Functino that builds the map using latitude and longitude
 * @param  {[type]} lati  used for latitude
 * @param  {[type]} longi used for longitude
 * @return {[type]}       [description]
 */
function theMap(lat, long) {

    var map = new google.maps.Map(document.getElementById('mapbox'), {
        center: {
            lat: parseFloat(lat),
            lng: parseFloat(long)
        },
        zoom: 9,
        draggable: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false
    });
}
geo();

/**
 * Ajax 
 * @param  {Object} #sub Ajax function to get into on link cicked
 * @param  {Objext} $.ajax Parses jason info
 * @return {Object} Parsed data from JSON file
 */
$(function(){
    $('#sub').click(function(e){
        e.preventDefault();
        console.log('select_link clicked');

        /**
         * Gets value from searchbox to search for location
         * @type {Object}
         */
        var search = {}
        search.location = $('#Searchbox').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(search),
            contentType: 'application/json',
            url: 'http://localhost:8080/',
            success: function(data) {
                console.log('success');
                var returned = JSON.parse(JSON.stringify(data))
                console.log(returned)
                returned = JSON.parse(data)
                google.maps.event.addDomListener(window, 'load', theMap(returned.location['lat'],returned.location['long']));
                load_weather(returned.weather)
                //load_news(returned["headlines"])

            }
        })
    })
})



/**
 * Function that loads info that has been stored
 * @param  {Object} returned Grabs all the info stored to be re-displayed
 */
function loadinfo(returned){ 
    console.log(returned)
    document.getElementById("homeloc").innerHTML = "Current Location";
    document.getElementById("temp").innerHTML = returned.home["temperature"]
    document.getElementById("summary").innerHTML = returned.home["summary"]

    document.getElementById("Location").innerHTML = returned.requested["location"]
    document.getElementById("temperature").innerHTML = returned.requested["temperature"]
    document.getElementById("weather").innerHTML = returned.requested["summary"]
    document.getElementById("lat").innerHTML = returned.requested["lat"]
    document.getElementById("lng").innerHTML = returned.requested["long"]
}

function load_news(dict){
    console.log(dict)
    
    
    /*
    for(var i = 0; i <= dict["dict_title"].length;i++){
        console.log(dict[JSON.stringify(i)])
    }
    */
}

function load_weather(dict){
    document.getElementById("w_day1").innerHTML = dict["day 1"]
    document.getElementById("w_day2").innerHTML = dict["day 2"]
    document.getElementById("w_day3").innerHTML = dict["day 3"]
    document.getElementById("w_day4").innerHTML = dict["day 4"]
    document.getElementById("w_day5").innerHTML = dict["day 5"]    
}


/** 
 * refreshs the map
 */

sub = document.getElementById("sub")
sub.addEventListener("click",function(){
    msg.innerHTML = ""
})

//borrowed from w3schools for initial layout
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}