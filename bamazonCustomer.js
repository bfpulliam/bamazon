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
            strItems += 'Item ID:' + data[i].item_id + ' ' + data[i].product_name + ' - ' + 'Price: $' + data[i].price + '\n';
            console.log(strItems);
        }
        start();
    });

}

//UPDATE `bamazon_db`.`products` SET `stock_quantity` = '25' WHERE (`item_id` = '1');
// }

function updateStock(quanity, stock_id) {
    
    var newQuanity = stock_quanity -quanity;
    var sqlUpdate = "UPDATE products SET stock_quantity = " + newQuanity + " WHERE item_id = " + answer;

    // execute the UPDATE statement
    connection.query(sqlUpdate, function (err, res) {
        if (err) throw err;
        console.log('Rows affected:', results.affectedRows);
    });
    connection.end();
}

function validateID(x) {
    if (isNaN(x) || x < 1 || x > 10) {
        console.log("Input not valid");
        return false;
    } else {
        console.log("Thank you");
        return true;
    }
}

function validateQuanity(x) {
    if (x > stock_quanity + 1){
        console.log("Insufficient inventory!!");
        return false;
    }else{
        console.log("Thank you for your purchase!");
        return true;
    }
}

// function which prompts the user for what action they should take
function start() {

    inquirer
        .prompt({
            type: "number",
            message: "What is the item_id number of the item that you wish to purchase?",
            name: "stock_id",
            filter: Number,
            validate: validateID
        }).then(function (answer) {
            console.log(answer);
            var queryQuanity = 'SELECT stock_quanity FROM products WHERE item_id='+ stock_id;
            // Make the db query
            connection.query(queryQuanity, function (err, data) {
                if (err) throw err;
                var stock_quanity = data;
            });
            inquirer
                .prompt({
                    type: "number",
                    message: "How many do you want?",
                    name: "quanity",
                    filter: Number,
                    validate: validateQuanity
                });
        });
}
        


