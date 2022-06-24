import faker from "faker";
import mysql from "mysql";

faker.locale = "de";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "example",
  database: "billingCloud",
});

var max_datas = 10;
var max_customers = 10000;

var invoice_tests = [];

var invoice_test_aggregates = [];
// var invoice_test_aggregates_marker = new Array(max_customers + 10);

for (let i = 1; i <= max_customers; ++i) {
  invoice_test_aggregates.push([i, 0, 0])
}

for (let i = 1; i <= max_datas; ++i) {
  let invoice_test = [
    faker.date.past(),
    Math.floor(Math.random() * max_customers + 1),
    Math.floor(Math.random() * 100000 + 10000),
    Math.floor(Math.random() * 100 + 1),
  ];

  invoice_test_aggregates[invoice_test[1]-1][1] += invoice_test[2];
  invoice_test_aggregates[invoice_test[1]-1][2] += invoice_test[3];

  invoice_tests.push(invoice_test);
}

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected to invoice_tests");
//   var sql =
//     "INSERT INTO invoice_tests (created_at, customer_id, gross_amount, tax_amount) VALUES ?";

//   con.query(sql, [invoice_tests], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows + " done");
//   });

//   var sql =
//     "INSERT INTO invoice_test_aggregates (customer_id, aggregate_gross_amount, aggregate_tax_amount) VALUES ?";

//   con.query(sql, [invoice_test_aggregates], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows + " done");
//   });


// });

con.connect(function(err) {
  if (err) throw err;


  for (let index = 1; index <= 5; ++index) {
    getData(con, index, new Date().getTime())
  }

  // con.query("SELECT * FROM invoice_tests WHERE customer_id='Doe'", function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result);
  // });
});

const getData = async (con, callIndex, sendTimeInMS) => {

  // con.query("SELECT * FROM invoice_tests WHERE customer_id="+Math.floor(Math.random() * max_customers + 1).toString(), function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result);

  //   let responseInMS = (new Date()).getTime() - sendTimeInMS;
  //         if (result){
  //             console.log("CallIndex : " + callIndex + " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " success");
  //         }
  //         else {
  //             console.log("CallIndex : " + callIndex +  " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " failed");
  //         }
  // });

  // con.query("SELECT COUNT(id) FROM invoice_tests WHERE customer_id="+Math.floor(Math.random() * max_customers + 1).toString(), function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result);

  //   let responseInMS = (new Date()).getTime() - sendTimeInMS;
  //         if (result){
  //             console.log("CallIndex : " + callIndex + " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " success");
  //         }
  //         else {
  //             console.log("CallIndex : " + callIndex +  " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " failed");
  //         }
  // });

  con.query("SELECT COUNT(id) FROM invoice_test_aggregates WHERE customer_id="+Math.floor(Math.random() * max_customers + 1).toString(), function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    let responseInMS = (new Date()).getTime() - sendTimeInMS;
          if (result){
              console.log("CallIndex : " + callIndex + " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " success");
          }
          else {
              console.log("CallIndex : " + callIndex +  " Response(ms): " + responseInMS + " Response(s): " + responseInMS / 1000 + " failed");
          }
  });

}

