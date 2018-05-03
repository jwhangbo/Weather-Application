const fs = require("fs")

// writes a dictionary into a file called apikeys.json

dict = {
    geolocation:"AIzaSyAW7KYlG_CKzcj-8KprU1FB3ek6_TXP9S0",
    darksky:"[ApiKey]",
    googlemaps:"AIzaSyA0nhSpy6r9Axl-AUxdha9ONTSVVNPvqjg"
}

fs.writeFileSync("Apikeys.json", JSON.stringify(dict))