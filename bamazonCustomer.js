require("dotenv").config();
sqlpword = process.env.sqlpword;
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // connection port
    port: 3306,
    //username
    user: "root",
    //password import from env
    password: sqlpword,
    database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //  run the function after the connection is made to prompt the user
    initBamazon();
});

//show items at Bamazon
function initBamazon() {
    // Create the db query string
    queryStr = 'SELECT item_id, product_name, price FROM products';
    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            var strItems = '';
            strItems += 'Item ID:' + data[i].item_id + ' ' + data[i].product_name + ' - '+ 'Price: $' + data[i].price + '\n';
            console.log(strItems);
        }
        start();
    });
    
}
// function validateID(name) {
//     if (name  === item_id) {
//         console.log(name);
//     } else {
//         console.log('Please enter a valid item id.');
//     }UPDATE `bamazon_db`.`products` SET `stock_quantity` = '25' WHERE (`item_id` = '1');
// }


// function which prompts the user for what action they should take
function start() {

    inquirer
        .prompt({
            type: "input",
            message: "What is the item_id number of the item that you wish to purchase?",
            name: "stock_id",
            // validate: validateID
        }).then(function(answer) {
            console.log(answer);
        inquirer
            .prompt({
                type: "input",
                message: "How many do you want?",
                name:"quanity"
            })
            .then(function (quanity) {
                console.log(quanity);
##########################################################################
                if (quanity === stock_quanity){
                    console.log("You have purchased " + quanity +"!");
                    var newquanity = (stock_quanity - quanity);
                    console.log(newquanity);
                    // inventory is high enough, so update db, let the user know, and start over
                    connection.query(
                        
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quanity: newquanity
                            },
                            {
                                item_id: answer
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Purchase successfully!");
                            initBamazon();
                        }
                    );
                
                }
                else{
                    console.log("Insufficient quantity!");
                    initBamazon();
                }
            });
    });
}