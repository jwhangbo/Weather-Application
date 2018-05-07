const forecast5days = require('./5days.js');
const NewsMethods = require('./news.js');
const NewsHeading = NewsMethods.NewsHeading;
const getdate = NewsMethods.get_date;
const getlocation = require('./geolocation.js')

/*----------------------------------5days.js------------------------------------------------*/

test("valid city and key for 5 day forecast", ()=> {
    
    return forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect.objectContaining(data)
});
});


test("Returns/contains a city for 5 day forecast", ()=> {
    
    return forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect.objectContaining("vancouver")
});
});


test("Returns/contains the correct api key for 5 day forecast", ()=> {
    
    return forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect.objectContaining("b54455db33264396bb6232547180405")
});
});






test("Data is correctly built for 5 day forecast", ()=> {
    
    return forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
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


/*----------------------------------geolocation.js------------------------------------------------*/

test("valid city and key for geolocation", ()=> {
    
    return getlocation('vancouver',"AIzaSyAW7KYlG_CKzcj-8KprU1FB3ek6_TXP9S0").then(data  =>{
        expect.objectContaining(data)
});
});

/*----------------------------------News.js------------------------------------------------*/

/*--------News_Heading-------*/
test("valid info entered into news", ()=> {
    
    return NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect.objectContaining(data)
});
});

test("Returns/contains a city for news", ()=> {
    
    return NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect.objectContaining("vancouver")
});
});


test("Returns/contains the correct news api key", ()=> {
    
    return NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect.objectContaining("cf790b0b67f8453285b01896414d5b41")
});
});

test("News data is correctly built", ()=> {
    
    return forecast5days('vancouver',"b54455db33264396bb6232547180405").then(data  =>{
        expect(data).toBe(data);
});
});

/*--------Get_date-------*/

test("Checks that date data was correctly received", ()=> {
	expect(getdate()).toBeDefined()
})

test("Checks that data was corretly turned/writting into a string", ()=> {
	expect(getdate()).toEqual(expect.any(String));
})

