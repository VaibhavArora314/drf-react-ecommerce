insert into api_category (id, title, description, featured_product_id)
values (1, 'Electronics', null, null);

insert into api_brand (id, title, description, featured_product_id)
values
  (1, 'Apple', null, null),
  (2, 'Logitech', null, null),
  (3, 'Sony', null, null),
  (4, 'Cannon', null, null),
  (5, 'Amazon', null, null);

insert into api_product (id, name, image, description, brand_id, category_id, price, countInStock, rating, numReviews, createdAt) 
values
  (1, 'Airpods Wireless Bluetooth Headphones', '/airpods.jpg', 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working', 1, 1, 89.99, 10, 4.5, 12, '2022-02-24 00:00:00'),
  (2, 'iPhone 11 Pro 256GB Memory', '/phone.jpg', 'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life', 1, 1, 599.99, 0, 4.0, 8, '2022-02-24 00:00:00'),
  (3, 'Cannon EOS 80D DSLR Camera', '/camera.jpg', 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design', 4, 1, 929.99, 5, 3.0, 12, '2022-02-24 00:00:00'),
  (4, 'Sony Playstation 4 Pro White Version', '/playstation.jpg', 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music', 3, 1, 399.99, 11, 5.0, 12, '2022-02-24 00:00:00'),
  (5, 'Logitech G-Series Gaming Mouse', '/mouse.jpg', 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience', 2, 1, 49.99, 7, 3.5, 10, '2022-02-24 00:00:00'),
  (6, 'Amazon Echo Dot 3rd Generation', '/alexa.jpg', 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space', 5, 1, 29.99, 0, 4.0, 12, '2022-02-24 00:00:00');