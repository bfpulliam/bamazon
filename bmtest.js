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



function validateID(x) {
	if (isNaN(x) || x < 1 || x > 10) {
		console.log("\nInput not valid");
		return false;
	} else {
		console.log("\nThank you");
		return true;
	}
}

// function validatequantity(x) {
// 	connection.query("SELECT item_id, product_name, inventory price FROM products WHERE item_id="+ x, function() {
//     	if (parseInt(x) > inventory + 1) {
//         console.log("Insufficient inventory!!");
//         return false;
//     	} else {
//         console.log("Thank you for your purchase!");
//         return true;
// 		}
// 	});
// }

// if (chosenItem.highest_bid < parseInt(answer.bid)) {
// 	// bid was high enough, so update db, let the user know, and start over
// 	connection.query(
// 		"UPDATE auctions SET ? WHERE ?",
// 		[
// 			{
// 				highest_bid: answer.bid
// 			},
// 			{
// 				id: chosenItem.id
// 			}
// 		],
// 		function (error) {
// 			if (error) throw err;
// 			console.log("Bid placed successfully!");
// 			start();
// 		}
// 	);
// }
// else {
// 	// bid wasn't high enough, so apologize and start over
// 	console.log("Your bid was too low. Try again...");
// 	start();
// }
//       });
//   });

// function which prompts the user for what action they should take
function start() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the item_id number of the item that you wish to purchase?",
				name: "stock_id",
				filter: Number,
				validate: validateID,
			},
			{
				type: "input",
				message: "How many do you want?",
				name: "procure",
				filter: Number

			}]).then(function(stock_id, procure) {
				var queryquantity = 'SELECT stock_quantity FROM products WHERE item_id=?' + stock_id;
				connection.query(queryquantity, function () {
					console.log("Inventory" + stock_quantity);

					if (err) throw err;
					if (parseInt(procure) < stock_quantity) {
						var newQuanity = (inventory - stock_quantity);
						connection.query("UPDATE products SET ? WHERE ?", [{
							stock_quantity: newQuanity
						}, {
							item_id: product
						}], function (err, res) { });
					} else {
						console.log("Opps!");
					}
				});
			});
}


// 	inquirer.prompt(questions, function (answers) {
// 		console.log(answers[0]);
// 		console.log(answers[0].stock_id);
// 		console.log(answers[0].procure);

// 		var queryquantity = 'SELECT stock_quantity FROM products WHERE item_id=' + answers[0].stock_id;
// 		connection.query(queryquantity, function(){
// 			console.log("Inventory" + stock_quantity);
// 			var inventory = stock_quantity;
// 			var product = stock_id;
// 			if (err) throw err;
// 			if (parseInt(product.procure) <= inventory) {
// 				var newQuanity = (inventory - procure);
// 				connection.query("UPDATE products SET ? WHERE ?", [{
// 					stock_quantity: newQuanity
// 				}, {
// 					item_id: product
// 				}], function (err, res) { });
// 			} else {
// 				console.log("Opps!");
// 			}
// 		});
// });
// }






