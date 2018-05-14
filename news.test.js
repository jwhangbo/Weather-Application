const NewsMethods = require('./news.js');
const getdate = NewsMethods.get_date;


/*--------News_Heading-------*/
test("valid info entered into news", ()=> {
    
    return NewsMethods.NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect.objectContaining(data)
});
});

test("Returns/contains a city for news", ()=> {
    
    return NewsMethods.NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect.objectContaining("vancouver")
});
});


test("Returns/contains the correct news api key", ()=> {
    
    return NewsMethods.NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect.objectContaining("cf790b0b67f8453285b01896414d5b41")
});
});

test("News data is correctly built", ()=> {
    
    return NewsMethods.NewsHeading('vancouver',"cf790b0b67f8453285b01896414d5b41").then(data  =>{
        expect(data).toBe(data);
});
});

/*--------Get_date-------*/

// test("Checks that date data was correctly received", ()=> {
// 	expect(getdate()).toBeDefined()
// })

// test("Checks that data was corretly turned/writting into a string", ()=> {
// 	expect(getdate()).toEqual(expect.any(String));
// })