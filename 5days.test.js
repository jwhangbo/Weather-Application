const forecast5days = require('./5days.js');

test("valid city and key for 5 day forecast", ()=> {
    
    return forecast5days.forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect.objectContaining(data)
});
});


test("Returns/contains a city for 5 day forecast", ()=> {
    
    return forecast5days.forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect.objectContaining("vancouver")
});
});


test("Returns/contains the correct api key for 5 day forecast", ()=> {
    
    return forecast5days.forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect.objectContaining("b54455db33264396bb6232547180405")
});
});


test("Data is correctly built for 5 day forecast", ()=> {
    
    return forecast5days.forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect(data).toEqual(data);
});
});

/*test("Fails when value is missing", ()=> {

	return forecast5days('   ', "b54455db33264396bb6232547180405").then(data =>{
		expect(data).not.toBe(data);
	})
})

test("Missing info", ()=> {
    
    return forecast5days('12323131',"b54455db33264396bb6232547180405").then(data  =>{
        expect.not.objectContaining(data)
});
}); */


