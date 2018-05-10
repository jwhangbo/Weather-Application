const request = require("request");

function places(lat, lng, key){
	var dict_place = {}
	var link = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&opennow&key=${key}`
	return new Promise((resolve, reject) => {
		request({
			url: link,
			json: true
		},
		(eer, resp, body) => {
			temp = 0
			if (!("ok" in body)) {
				dict_place = body.results
			}
			console.log(dict_place);
		})
	})
}

places("49.25","-123.19",'AIzaSyBb9iHdqEA4Z2e5HxHpC5TTFKuOiRmlFYA')