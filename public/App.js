/**
 * Stores home location
 * @type {Object}
 */
var homelocation = {}

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
    var home = document.getElementById("homeloc");
    var apiKey = "";
    var url = 'https://api.forecast.io/forecast/';

    //navigator.geolocation.getCurrentPosition(success, error);
    /**
     * success functions that returns the temp and summary from the forecast
     * @param  {int} position Stores coordinate location info
     */
    function success(position) {
        homelocation["lat"] = position.coords.latitude;
        homelocation["long"] = position.coords.longitude;
    }
    /** 
     * error message
     */
    function error() {
        home.innerHTML = "Unable to retrieve your location. Please turn on location.";
    }
}

geo();
/**
 * Functino that builds the map using latitude and longitude
 * @param  {[type]} lati  used for latitude
 * @param  {[type]} longi used for longitude
 * @return {[type]}       [description]
 */
function theMap(lati, longi) {

    var map = new google.maps.Map(document.getElementById('mapbox'), {
        center: {
            lat: parseInt(document.getElementById("lat").innerHTML),
            lng: parseInt(document.getElementById("lng").innerHTML)
        },
        zoom: 7,
        draggable: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false
    });
}


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
        search.home = homelocation;


        $.ajax({
            type: 'POST',
            data: JSON.stringify(search),
            contentType: 'application/json',
            url: 'http://localhost:8080/',
            success: function(data) {
                console.log('success');
                var returned = JSON.parse(JSON.stringify(data))
                returned = JSON.parse(data)
                loadinfo(returned)
                //google.maps.event.addDomListener(window, 'load', theMap(returned.requested["lat"], returned.requested["long"]));
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
/** 
 * refreshs the map
 */
google.maps.event.addDomListener(window, 'load', theMap);
