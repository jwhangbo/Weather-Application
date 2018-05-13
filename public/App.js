/**
 * Stores home location
 * @type {Object}
 */


/* VARS */

var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var dayList = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

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


    // ALL THE STUFF BELOW ARE TEMPORARY AND HARDCODED TESTS
    //temp marker 1
    var marker1 = new google.maps.Marker({
    position: {lat: 51.5040727, lng: -0.1784748},
    map: map,
    });

    var infowindow = new google.maps.InfoWindow({
      content: "TESTING"
    });

    // Custom icons for markers
    // Switchable between mouseover and mouseout

    // Example:
    /* var icon2 = "feelsgoodman.png";

    google.maps.event.addListener(marker1, 'mouseover', function() {
      marker1.setIcon(icon2);
    });

    */
    
    // Somehow need to create a list to iterate containing all the infowindows
    // Reference: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    marker1.addListener('click', function() {
      infowindow.open(map, marker1)
    });

    //temp marker 2
    var marker = new google.maps.Marker({
    position: {lat: 51.4880927, lng: -0.1383774},
    map: map,
    });

    //temp marker 3
    var marker = new google.maps.Marker({
    position: {lat: 51.4937705, lng: -0.1098964},
    map: map,
    });


}

/**
 * Function that builds the map using latitude and longitude of the attractions
 * @param  {[type]} dict used to retrieve lat/lng for each place
 * @return {[type]}       [description]
 */
function addMarker(dict) {
    var min = 1, max = 5

    var lati = dict.place1.geometry["lat"],
        longi = dict.place1.geometry["lng"]

    var map = new google.maps.Map(document.getElementById('mapbox'), {
        center: {lat: lati, lng: longi},
        zoom: 13,
        draggable: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true
    });

    for(var i=min; i<max+1; i++) {
        var place = dict["place"+i]
        lati = place.geometry["lat"]
        longi = place.geometry["lng"]
        var marker = new google.maps.Marker({
            position: {lat: lati, lng: longi},
            map: map,
        });
    }

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
        ajax(search)
    })

    $('#Searchbox').keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            console.log('select_link clicked');

            /**
             * Gets value from searchbox to search for location
             * @type {Object}
             */
            var search = {}
            search.location = $('#Searchbox').val();
            search.filter = get_radial()
            ajax(search)
        }
    })
})

function ajax(search){
    $.ajax({
            type: 'POST',
            data: JSON.stringify(search),
            contentType: 'application/json',
            url: 'http://localhost:8080/',
            success: function(data) {
                console.log('success');
                var returned = JSON.parse(JSON.stringify(data))
                returned = JSON.parse(data)
                console.log(returned)
                if (returned["error"] === "None"){
                    google.maps.event.addDomListener(window, 'load', theMap(returned.location['lat'], returned.location['long']));
                    load_news(returned["headlines"])
                    load_weather(returned.weather)
                    load_bg(returned["background"])
                    load_attract(returned["places"])
                } else {
                    alert(returned["error"])
                }
            }
    })
}

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

/**
 * Function that loads the background image of the city into the page
 * @param  {Object} background the url containing the city img for the background
 */
function load_bg(background) {
    document.body.style.backgroundImage = "url("+background+")";
}

function load_attract(dict) {
    addMarker(dict)
    document.getElementById("attr1").innerHTML = "<b>" + dict.place1["title"] +  "</b> [" + dict.place1["rating"] + "] <br> " +  dict.place1["address"]
    document.getElementById("attr2").innerHTML = "<b>" + dict.place2["title"] +  "</b> [" + dict.place2["rating"] + "] <br> " +  dict.place2["address"]
    document.getElementById("attr3").innerHTML = "<b>" + dict.place3["title"] +  "</b> [" + dict.place3["rating"] + "] <br> " +  dict.place3["address"]
    document.getElementById("attr4").innerHTML = "<b>" + dict.place4["title"] +  "</b> [" + dict.place4["rating"] + "] <br> " +  dict.place4["address"]
    document.getElementById("attr5").innerHTML = "<b>" + dict.place5["title"] +  "</b> [" + dict.place5["rating"] + "] <br> " +  dict.place5["address"]
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
        var day = i + 1,
            w_month = new Date(),
            w_date = new Date(),
            w_day = new Date(),
            day_dict = dict["day"+day];
            console.log(w_day)
            weekday = i
        document.getElementById("w_icon" + day).src = day_dict["icon"]
        document.getElementById("w_summary" + day).innerHTML = day_dict["desc"]
        document.getElementById("w_temp" + day).innerHTML = day_dict["mintemp"] + "°C ~ " + day_dict["maxtemp"] + "°C"
        if (weekday > 6) {
            weekday = 0
        }
        document.getElementById("w_date" + day).innerHTML = dayList[weekday] + ", "+ monthList[w_month.getMonth()] + " " + (w_date.getDate() + day-1)
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
    else if (document.getElementById("Res").checked == true){
        return("restaurant")
    }
}
