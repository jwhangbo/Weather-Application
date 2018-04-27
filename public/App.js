/**  geo weather 
Fuction that changes the homeloc div.
If the it is able to get the cordinates of the user then it will send it to the temp and summary div
Else it will say an error message if an error occurs*/

var homelocation = {}

function geo() {
    var home = document.getElementById("homeloc");
    var apiKey = "7727724c91d385de32cc9af5b98f52fd";
    var url = 'https://api.forecast.io/forecast/';

    navigator.geolocation.getCurrentPosition(success, error);
    /** success functions that returns the temp and summary from the forecast */
    function success(position) {
        homelocation["lat"] = position.coords.latitude;
        homelocation["long"] = position.coords.longitude;
    }
    /** error message */
    function error() {
        home.innerHTML = "Unable to retrieve your location. Please turn on location.";
    }
}

geo();
/** Map Window 
Just a Map that changes with the lng and lat*/
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

$(function(){
    $('#sub').click(function(e){
        e.preventDefault();
        console.log('select_link clicked');

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
                google.maps.event.addDomListener(window, 'load', theMap(returned.requested["lat"], returned.requested["long"]));
            }
        })
    })
})

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
/** refreshs the map */
google.maps.event.addDomListener(window, 'load', theMap);
