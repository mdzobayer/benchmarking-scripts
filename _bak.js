//import 'isomorphic-fetch';
import fetch from 'node-fetch'
import faker from 'faker';

faker.locale = "de";


const TOKEN = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJFOUZEQTEwQi0yMzFCLTQ5MTEtOURENS05NThCNjhBQ0ZFM0IiLCJzdWIiOiIzNWU4ZGFjMC0wNjQ5LTRlOGItYWIxMC1lNWE2ZGFhYTQ3NWEiLCJzaXRlX2lkIjoiRUIxQTE0NzctMTU1My00NTc0LTk1OTgtNjhBNkE3NEU5RTVBIiwib3JpZ2luIjoic2xuLWZjY3ouc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6ImVjYXAtNzA4ZTc4ZTQtNWZkNi00MjlhLTk0NjctNjVlYjI0NzMzOGJhIiwidXNlcl9pZCI6IjM1ZThkYWMwLTA2NDktNGU4Yi1hYjEwLWU1YTZkYWFhNDc1YSIsImRpc3BsYXlfbmFtZSI6Ik1hcmsgR3JhbnQiLCJzaXRlX25hbWUiOiJFY2FwIFRlYW0iLCJ1c2VyX25hbWUiOiI0MDAwMDE5MTFAeW9wbWFpbC5jb20iLCJlbWFpbCI6IjQwMDAwMTkxMUB5b3BtYWlsLmNvbSIsInBob25lX251bWJlciI6IjAwMDAwMDAwMDAwIiwibGFuZ3VhZ2UiOiJlbi1VUyIsInVzZXJfbG9nZ2VkaW4iOiJUcnVlIiwibmFtZSI6IjM1ZThkYWMwLTA2NDktNGU4Yi1hYjEwLWU1YTZkYWFhNDc1YSIsInVzZXJfYXV0b19leHBpcmUiOiJGYWxzZSIsInVzZXJfZXhwaXJlX29uIjoiMDEvMDEvMDAwMSAwMDowMDowMCIsInJvbGUiOlsiYW5vbnltb3VzIiwiYWR2aXNvciIsImFwcHVzZXIiLCJhZHZpc29yXzI5OTk5OTMiXSwibmJmIjoxNjM2NjI3MjQ1LCJleHAiOjE2MzY2Mjc2NjUsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.Rzswddm3vHdkqZYJqVW2fFCY3bWoCzs_y7YiyLFaahYva4DsCfzdObluFDEFKlWa_DHXXfGEbzrphPr_1Mstg_2qUAq6pod6Yu0xWF390eHZVt9xo2qGE0pTeow_-uZFlHm6ro4mKBqRwkKSdz4IFxXzvqGO3kc23JkPIiWKclkcBi1Ay9Z4e58l0xlsJVB_OUqHjTdVi8WWws8dqwSesuOcEL859xCmjZE-u7RAQtuV7e7RyN6naOc-SE9QYqka09m2dlAPPRmwvboJ8nPVAB7eMjv4t0qcMXjJMUSlgrTqpc6XhckHwmObPWK_pQ71ErZt8AgcF-EN18NeeIb9AQ"

const randomAgent = () => JSON.stringify(
    {
        "FirstName": faker.name.firstName(),
        "LastName": faker.name.lastName(),
        "SubcontractorID": 2,
        "Email": faker.internet.email(),
        "IsActive": true,
    }
);
const createAgent = (num) => {
    for (let i = 0; i < num; i++) {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            body: randomAgent(),
            redirect: 'follow'
        };
        fetch(API_URL+"/agent", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}

const getDataBody = () => {
    const body = {
        "operationName": "findData",
        "variables": {},
        "query": "query findData {\n  ContractEvidenceCodes(Model: {IsFullTextSearch: false, PageNumber: 1, Filter: \"{$and:[{'PersonId' : {$in : ['a21d11ab-fe8c-469e-89c8-29738b701e70']}},{'IsInsure' : {$eq : 1}},{'ActiveInsures' : {$elemMatch : {'IsArchived':{'$ne':true}}}}]}\", Sort: \"{}\", PageSize: 10}) {\n    Data {\n      ItemId\n      Title\n      ECode\n      ClientId\n      ActiveInsures {\n        ItemId\n        PartnerName\n        PartnerId\n        ContractNumber\n        DivisionCode\n        StartDate\n        EndDate\n        Frequency\n        Amount\n        DataSource\n        ConflictStatus\n        ContractType\n        ExternalUpdatedDate\n        IsHidden\n      }\n      InsureFinDataStatus\n      Tags\n    }\n    ErrorMessage\n    Success\n    ValidationResult\n  }\n}\n"
        //"query": "query findData {\n  ContractEvidenceCodes(Model: {IsFullTextSearch: false, PageNumber: 1, Filter: \"{$and:[{'PersonId' : {$in : ['a21d11ab-fe8c-469e-89c8-29738b701e70']}},{'IsInsure' : {$eq : 1}},{'IsArchived' : {$ne : true}}]}\", Sort: \"{}\", PageSize: 10}) {\n    Data {\n      ItemId\n      Title\n      ECode\n      ClientId\n      ActiveInsures {\n        ItemId\n        PartnerName\n        PartnerId\n        ContractNumber\n        DivisionCode\n        StartDate\n        EndDate\n        Frequency\n        Amount\n        DataSource\n        ConflictStatus\n        ContractType\n        ExternalUpdatedDate\n        IsHidden\n      }\n      InsureFinDataStatus\n      Tags\n    }\n    ErrorMessage\n    Success\n    ValidationResult\n  }\n}\n"
    };
    return JSON.stringify(body);
}

const getData = async (callIndex, sendTimeInMS) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Connection": "keep-alive",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
            "Content-Type": "application/json",
            "Origin": "http://sln-fccz.seliselocal.com",
            "Referer": "http://sln-fccz.seliselocal.com/",
            "Accept-Language": "en-US,en;q=0.9",
            "Authorization": TOKEN
        },
        body: getDataBody(),
        redirect: 'follow'
    };

        fetch("http://microservices.seliselocal.com/api/gqlquery/v5/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            let responseInMS = (new Date()).getTime() - sendTimeInMS;
            if (result){
                console.log("CallIndex : " + callIndex + " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " success");
            }
            else {
                console.log("CallIndex : " + callIndex +  " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " failed");
            }
        })
        .catch(error => console.log('error', error));
}

const deleteCustomer = async (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: null,
        redirect: 'follow'
    };
    return await fetch(API_URL+"/customer/" + id, requestOptions)
        .then(response => response.json())
}

// DELETE all customers
// getAllCustomers().then(resp => {
//     resp.map(c => c.ID).forEach(id => {
//         deleteCustomer(id)
//     })
// })

// createAgent(200)
for (let index = 0; index < 50; ++index) {
    getData(index, new Date().getTime())
}


// BOOK product to customer

