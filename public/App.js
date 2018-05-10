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

    //navigator.geolocation.getCurrentPosition(success, error);
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
        msg = document.getElementById("msg");
        msg.innerHTML = "Unable to retrieve your location. Please turn on location.";
    }
}
geo();
/**
 * Function that builds the map using latitude and longitude
 * @param  {[type]} lati  used for latitude
 * @param  {[type]} longi used for longitude
 * @return {[type]}       [description]
 */


function theMap(lati, longi) {

   var map = new google.maps.Map(document.getElementById('mapbox'), {
        center: {lat: lati, lng: longi},
        zoom: 13,
        draggable: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true
    });

    var marker = new google.maps.Marker({
    position: {lat: lati, lng: longi},
    map: map,
    });
    
}
geo();


/**
 * Ajax 
 * @param  {Object} #sub Ajax function to get into on link cicked
 * @param  {Objext} $.ajax Parses jason info
 * @return {Object} Parsed data from JSON file
 */
$(function() {
    $('#sub').click(function(e) {
        e.preventDefault();
        console.log('select_link clicked');

        /**
         * Gets value from searchbox to search for location
         * @type {Object}
         */
        var search = {}
        search.location = $('#Searchbox').val();
        search.filter = get_radial()
        console.log(search)

        $.ajax({
            type: 'POST',
            data: JSON.stringify(search),
            contentType: 'application/json',
            url: 'http://localhost:8080/',
            success: function(data) {
                console.log('success');
                var returned = JSON.parse(JSON.stringify(data))
                returned = JSON.parse(data)
                google.maps.event.addDomListener(window, 'load', theMap(returned.location['lat'], returned.location['long']));
                load_news(returned["headlines"])
                load_weather(returned.weather)
            }
        })
    })
})


/**
 * Function that loads info that has been stored
 * @param  {Object} returned Grabs all the info stored to be re-displayed
 */
function loadinfo(returned) {
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

function load_news(dict) {
    document.getElementById("title1").innerHTML = dict.dict_title[0]
    document.getElementById("title2").innerHTML = dict.dict_title[1]
    document.getElementById("title3").innerHTML = dict.dict_title[2]
    document.getElementById("title4").innerHTML = dict.dict_title[3]
    document.getElementById("title5").innerHTML = dict.dict_title[4]

    document.getElementById("pic1").src = dict.dict_pic[0]
    document.getElementById("pic2").src = dict.dict_pic[1]
    document.getElementById("pic3").src = dict.dict_pic[2]
    document.getElementById("pic4").src = dict.dict_pic[3]
    document.getElementById("pic5").src = dict.dict_pic[4]

    document.getElementById("title1").href = dict.dict_url[0]
    document.getElementById("title2").href = dict.dict_url[1]
    document.getElementById("title3").href = dict.dict_url[2]
    document.getElementById("title4").href = dict.dict_url[3]
    document.getElementById("title5").href = dict.dict_url[4]
    
    document.getElementById("link1").href = dict.dict_url[0]
    document.getElementById("link2").href = dict.dict_url[1]
    document.getElementById("link3").href = dict.dict_url[2]
    document.getElementById("link4").href = dict.dict_url[3]
    document.getElementById("link5").href = dict.dict_url[4]


    /*
    for(var i = 0; i <= dict["dict_title"].length;i++){
        console.log(dict[JSON.stringify(i)])
    }
    */
}

function load_weather(dict){
    for(var i = 0; i<5; i++){
        var day = i + 1
        var day_dict = dict["day"+day]
        document.getElementById("w_icon" + day).src = day_dict["icon"]
        document.getElementById("w_summary" + day).innerHTML = day_dict["desc"]
        document.getElementById("w_temp" + day).innerHTML = day_dict["mintemp"] + "°C ~ " + day_dict["maxtemp"] + "°C"
    }
}


/** 
 * refreshes the map
 */

sub = document.getElementById("sub")
sub.addEventListener("click", function() {
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
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 8000); // Change image every 2 seconds
}

function get_radial(){
    if (document.getElementById("AP").checked == true){
        return("amusement_park")
    }
    else if (document.getElementById("AQ").checked == true){
        return("aquarium")
    }
    else if (document.getElementById("AG").checked == true){
        return("art_gallery")
    }
    else if (document.getElementById("CAS").checked == true){
        return("casino")
    }
    else if (document.getElementById("MM").checked == true){
        return("museum")
    }
    else if (document.getElementById("NC").checked == true){
        return("night_club")
    }
    else if (document.getElementById("Park").checked == true){
        return("park")
    }
    else if (document.getElementById("SM").checked == true){
        return("shopping_mall")
    }
    else if (document.getElementById("Zoo").checked == true){
        return("zoo")
    }
    else if (document.getElementById("res").checked == true){
        return("restraunt")
    }
}