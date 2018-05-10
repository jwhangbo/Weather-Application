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
