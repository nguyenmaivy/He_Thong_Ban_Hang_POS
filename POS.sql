CREATE TABLE categories (
    id_category INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE products (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255),
    id_category INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_category) REFERENCES categories(id_category)
);

CREATE TABLE orders (
    id_order INT PRIMARY KEY AUTO_INCREMENT,
    table_number VARCHAR(10),
    order_type ENUM('dine_in', 'takeaway') DEFAULT 'dine_in',
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    payment_method ENUM('card', 'cash') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id_order_item INT PRIMARY KEY AUTO_INCREMENT,
    id_order INT NOT NULL,
    table_number VARCHAR(10), -- Thêm trước product_name
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE
);

CREATE INDEX idx_products_category ON products(id_category);
CREATE INDEX idx_order_items_order ON order_items(id_order);

INSERT INTO categories (id_category, name, image_path) VALUES
(1, 'Cupcake', '/images/cupcake.jpg'),
(2, 'Sea food', '/images/seafood.jpg'),
(3, 'Juice', '/images/juice.jpg'),
(4, 'Coca', '/images/coca.jpg'),
(5, 'Orange juice', '/images/orange-juice.jpg');

INSERT INTO products (id_product, name, price, image_path, id_category) VALUES
(1, 'Hamburger', 123000, '/images/hamburger.jpg', 2),
(2, 'Grilled squid satay', 123000, '/images/grilled-squid.jpg', 2),
(3, 'Grilled squid satay', 123000, '/images/grilled-squid.jpg', 2),
(4, 'Grilled squid satay', 123000, '/images/grilled-squid.jpg', 2),
(5, 'Grilled squid satay', 123000, '/images/grilled-squid.jpg', 2),
(6, 'Grilled squid satay', 123000, '/images/grilled-squid.jpg', 2),
(7, 'Apple Juice', 35000, '/images/apple-juice.jpg', 3),
(8, 'Pineapple Juice', 35000, '/images/pineapple-juice.jpg', 3),
(9, 'Coca-Cola Zero', 25000, '/images/coca-zero.jpg', 4),
(10, 'Coca-Cola Original', 25000, '/images/coca-original.jpg', 4),
(11, 'Fresh Orange Juice', 40000, '/images/fresh-orange.jpg', 5),
(12, 'Orange Smoothie', 45000, '/images/orange-smoothie.jpg', 5);  