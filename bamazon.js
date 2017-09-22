var mysql = require("mysql");
var inquirer = require("inquirer");
var temp = 0;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MyNewPass",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user


});

connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(results)
})

start();

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "buymore",
            type: "rawlist",
            message: "Would you like to buy more things?",
            choices: ["YES", "NAH"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.buymore.toUpperCase() === "YES") {
                purchase();
            } else {
                console.log("You're missing out!!!")
            }
        });
}

// function to handle posting new items up for auction
function purchase() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "What is the product ID of which you want to buy?"
            }, {
                name: "unitz",
                type: "input",
                message: "How many units?"
            }
            // {
            //   name: "startingBid",
            //   type: "input",
            //   message: "What would you like your starting bid to be?",
            //   validate: function(value) {
            //     if (isNaN(value) === false) {
            //       return true;
            //     }
            //     return false;
            //   }
            // }
        ])
        .then(function(answers) {

            connection.query(
                "SELECT item_id FROM products WHERE item_id=?", 
                answers.id, function(res, err) {
                    console.log(res)
                    //if (err) throw err;
                    //need to do a for loop to go through 
                    //primary key to check the name of the product
                    //and if there are enough units
                    //if both conditions are met, SUBTRACT number of units and
                    //console log "Your ordered...successfully!" and DISPLAY table
                    //if one or more conditions are not met, then console log 
                    //"sorry, can't make this transaction!"
                    for (i = 0; i < res.length; i++) {
                        if (answer.id === res[i].item_id && answer.unitz <= res[i].stock_quantity) {
                            console.log("Your ordered product is processed successfully!")
                            temp = res[i].stock_quantity - answer.unitz
                            console.log(temp)
                            console.log("Price:" + res[i].price*answers.unitz)
                            //update(answers)

                            start();
                        } else {
                            console.log("sorry, can't make this transaction!")
                        }
                    }




                }

            );
        });
}

function update(answers) {

    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
            stock_quantity: temp
        }, {
            item_id: answers.id
        }],
        function(err, res) {
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes

        }
    );
    console.log(query.sql)
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(json.stringify(results))
    })
}

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }