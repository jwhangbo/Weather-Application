const request = require("request");

module.exports.places = function(lat, lng, filter, key){
	var dict_place = {}
	var link = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${filter}&radius=10000&opennow&key=${key}`
	return new Promise((resolve, reject) => {
		request({
			url: link,
			json: true
		},
		(eer, resp, body) => {
			temp = 0
			if (!("ok" in body)) {
				var bodylength = body["results"].length
				for(var i=0; i<bodylength; i++){
					count = i + 1
					place_dict = {}
					place_dict["geometry"] = body["results"][i].geometry.location
					place_dict["title"] = body["results"][i].name
					place_dict["rating"] = body["results"][i].rating
					place_dict["address"] = body["results"][i].vicinity
					dict_place["place"+count] = place_dict
				}
				resolve(dict_place)
			}
			reject(dict_place)
		})
	})
}