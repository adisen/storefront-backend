/* Replace with your SQL commands */
CREATE TYPE orderStatus AS ENUM ('active', 'complete');

CREATE TABLE orders(id SERIAL PRIMARY KEY, quantity INTEGER, status orderStatus, product_id bigint REFERENCES products(id), user_id bigint REFERENCES users(id));