CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
item_id INT(11) PRIMARY KEY  NOT NULL AUTO_INCREMENT ,
product_name VARCHAR(20) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price INT(11) NOT NULL ,
stock_quantity INT(11) NOT NULL
);

INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('1', 'laptop', 'electronics', '400', '2');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('2', 'usb-c charger', 'electronics', '20', '60');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('3', 'tee', 'clothing', '15', '2');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('4', 'socks', 'clothing', '6', '6');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('5', 'coca-cola soda', 'food', '1', '16');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('6', 'organic dinner', 'electronics', '4', '10');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('7', 'soccer ball', 'athletic equipment', '10', '2');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('8', '5 lb dumbbells', 'athletic equipment', '5', '4');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('9', 'yoga mat', 'athletic equipment', '30', '15');
INSERT INTO `bamazon_db`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('10', 'painting of owner', 'miscellaneous', '800', '1');