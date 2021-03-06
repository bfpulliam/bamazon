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

function initBamazon() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        displayItems();
    });
}
function displayItems() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.log("WELCOME TO BAMAZON");
        console.table(res);
        purchaseItem();
    });
}


function purchaseItem() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                message: "What is the item_id number of the item that you wish to purchase?",
                name: "stock_id",
                type: "input"
            },
            {
                message: "How much would you like to buy?",
                name: "purchase_amount",
                type: "input"
            }
        ]).then(function (user) {
            //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

            connection.query("SELECT * FROM products WHERE item_id=?", user.stock_id, function (err, res) {
                for (var i = 0; i < res.length; i++) {

                    if (user.purchase_amount > res[i].stock_quantity) {
                        console.log("There are not enough items in inventory.  Please select again");
                        purchaseItem();
                    } else {
                        //list item information for user for confirm prompt
                        console.log("You've selected: " + res[i].product_name + ".  The cost of the item is: " + res[i].price);
                        console.log("Total: " + res[i].price * user.purchase_amount);
                        var newStock = (res[i].stock_quantity - user.purchase_amount);
                        var purchaseId = (user.stock_id);
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            item_id: purchaseId
                        }], function (err, res) {
                            console.log("Thank you for your purchase. We have " + newStock + " left.");
                            displayItems();
                        });

                    }
                }
            });
        });
    });
}

initBamazon();