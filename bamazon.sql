productsCREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
  id INT NOT NULL AUTO_INCREMENT,
  item_id VARCHAR(45) NULL,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DOUBLE,
  stock_quantity INT,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11111", "coffee", "walmart", .25, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11112", "tea", "jcpenny", .25, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11113", "shirts", "jcpenny", 10, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11114", "pants", "jcpenny", 10, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11115", "skirts", "jcpenny", 10, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11116", "books", "half-price", 10, 30 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11117", "cocoa butter", "target", 5, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11118", "pencils", "walmart", .25, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11119", "chess sets", "target", 10, 100 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11120", "markers", "target", 1, 1000 );
