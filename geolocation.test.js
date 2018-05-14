const getlocation = require('./geolocation.js');





test("valid city and key for geolocation", ()=> {
    
    return getlocation.get_location('vancouver',"AIzaSyAW7KYlG_CKzcj-8KprU1FB3ek6_TXP9S0").then(data  =>{
        expect.objectContaining(data)
});
});
