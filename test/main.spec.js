
/**
 * Load the needed libraries
 * Mocha is not here, since it is the test runner
 */
import fetch from 'node-fetch';
import should from "should";
import request from 'request';
import chai from 'chai'
const expect = chai.expect;
const urlBase = "http://localhost:5555/api/v1";
const API_URL = "http://localhost:5555/api/v1";
let TOKEN = ""

// // Create our test case, we need to inform the description
// describe("magicthegathering.io API test",function(){
//     // the it function do the test, in this case, the endpoint /cards, that should return 100 cards max
//     it("Should return 100 cards max",function(done){
//         request.get(
//             {
//                 url : urlBase + "/customers"
//             },
//             function(error, response, body){
//
//                 // convert the response to json
//                 var _body = {};
//                 try{
//                     _body = JSON.parse(body);
//                 }
//                 catch(e){
//                     _body = {};
//                 }
//
//                 // using chai expect function, lets check the result
//                 expect(response.statusCode).to.equal(200);
//
//                 // now, we check if the property cards is avaliable
//                 if( _body.should.have.property('cards') ){
//                     // if true, lets check the length
//                     expect(_body.cards).to.have.lengthOf.at.most(100);
//                 }
//
//                 done(); // callback the test runner to indicate the end...
//             }
//         );
//     });
//
//     it("Should receive the card 'Heedless One' ",function(done){
//         // lets check the name and artists name
//         request.get(
//             {
//                 url : urlBase + "/cards?name=Heedless One"
//             },
//             function(error, response, body){
//
//                 // object 2 json
//                 var _body = {};
//                 try{
//                     _body = JSON.parse(body);
//                 }
//                 catch(e){
//                     _body = {};
//                 }
//
//                 // sucesso (200)?
//                 expect(response.statusCode).to.equal(200);
//
//                 // do we have cards?
//                 if( _body.should.have.property('cards') ){
//                     // do we have at least one?
//                     expect(_body.cards).to.have.lengthOf.at.least(1);
//
//                     // check the first card
//                     if(_body.cards[0].should.have.property('artist')){
//                         expect(_body.cards[0].artist).to.equal('Mark Zug');
//                     }
//                     if(_body.cards[0].should.have.property('name')){
//                         expect(_body.cards[0].name).to.equal('Heedless One');
//                     }
//                 }
//
//                 done(); // callback
//             }
//         );
//     });
// });


const GET = async (url) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+TOKEN
        },
        body: null,
        redirect: 'follow'
    };
    return await fetch(API_URL+url, requestOptions)
        .then(response => response.json().then(data => ({status: response.status, body: data})))
}
const POST = async (url, body) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+TOKEN
        },
        body: JSON.stringify(body),
        redirect: 'follow'
    };
    return await fetch(API_URL+url, requestOptions)
        .then(response => response.json().then(data => ({status: response.status, body: data})))
}

describe("API test", async ()=> {
    it("Should be able to login and set token", async () => {
        const resp = await POST('/login', {Email: "admin@movido.cloud", Password: "1qazZAQ!"});
        expect(resp.status).to.equal(200);
        expect(resp.body.data.token).to.not.undefined;
        TOKEN = resp.body.data.token;
    });

    it("Should make sure there is no customer in DB", async () => {
        const resp = await GET('/customer');
        expect(resp.status).to.equal(200);
        expect(resp.body.data.customers.length).to.equal(0);
    });
});
