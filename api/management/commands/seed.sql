insert into api_category (id, title, description, featured_product_id,image)
values 
(1, 'Electronics', null, null, '/electronics.jpg'),
(2, 'Food and Beverages', null, null, '/food.jpeg');

insert into api_brand (id, title, description, featured_product_id, image)
values
  (1, 'Apple', null, null, '/apple.png'),
  (2, 'Logitech', null, null,'/Logitech.png'),
  (3, 'Sony', null, null,'/sony.png'),
  (4, 'Cannon', null, null,'/cannon.png'),
  (5, 'Amazon', null, null,'/amazon.webp'),
  (6, 'Kelloggs', null, null,'/kelloggs.png'),
  (7, 'Coca Cola', null, null,'/coca-cola.png');

insert into api_product (id, name, image, description, brand_id, category_id, price, countInStock, rating, numReviews, createdAt) 
values
  (1, 'Airpods Wireless Bluetooth Headphones', '/airpods.jpg', 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working', 1, 1, 7500.00, 92, 4.5, 17, '2022-02-24 00:00:00'),
  (2, 'iPhone 11 Pro 256GB Memory', '/iphone11pro.jpg', 'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life', 1, 1, 49999.00, 20, 4.0, 10, '2022-02-24 00:00:00'),
  (3, 'Cannon EOS 80D DSLR Camera', '/camera-eos-80d.jpg', 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design', 4, 1, 75000.00, 65, 3.0, 12, '2022-02-24 00:00:00'),
  (4, 'Sony Playstation 4 Pro White Version', '/playstation.jpg', 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music', 3, 1, 34000.00, 51, 5.0, 12, '2022-02-24 00:00:00'),
  (5, 'Logitech G-Series Gaming Mouse', '/mouse.jpg', 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience', 2, 1, 5000.00, 47, 3.5, 10, '2022-02-24 00:00:00'),
  (6, 'Amazon Echo Dot 3rd Generation', '/alexa.jpg', 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space', 5, 1, 2499.00, 70, 4.0, 12, '2022-02-24 00:00:00'),
  (7, 'Pringles Potato Chips, 107g', '/pringles-potato-chips.jpg', 'Unlike other Potato chips, Pringles crisps are made from a mix of Potato, Rice flour, Corn Flour, and Wheat starch. It is light and crispy and comes in a can!', 6, 2, 115.00, 100, 4.0, 12, '2022-02-24 00:00:00'),
  (8, 'Pringles Sour Cream & Onion Flavour, 134g', '/pringles-sour-cream-and-onion.jpg', 'Relish Pringles Sour Cream & Onion Flavored Potato Chips, crispy snack, loved by everyone for its delicious taste and crispy texture. Pringles Sour Cream & Onion flavor Potato Chips are delicious.', 6, 2, 150.00, 120, 3.9, 10, '2022-02-24 00:00:00'),
  (9, 'Pringles Original, Classic Salted Potato Chips, 134g', '/pringles-original.jpg', 'Relish the classic, Pringles Original Chips, crispy snack, loved by everyone for its delicious taste and crispy texture. Pringles Original Potato Chips are delicious.', 6, 2, 150.00, 150, 4.5, 15, '2022-02-24 00:00:00'),
  (10, 'Coke Zero Sugar Cold drink, 300 ml (Pack of 6)', '/coke-diet.jpg', 'Coca-Cola Zero comes in a new and real Coca-Cola taste without the sugar and calories', 7, 2, 240.00, 100, 4.2, 12, '2022-02-24 00:00:00'),
  (11, 'Coke Original Cold Drink, 300 ml (Pack of 6)', '/coke-original.jpg', 'Savor the refreshing cola flavor that is deliciously uplifting', 7, 2, 240.00, 110, 4.6, 18, '2022-02-24 00:00:00');