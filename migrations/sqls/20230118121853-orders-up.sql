/* Replace with your SQL commands */
DROP TYPE IF EXISTS orderStatus;
CREATE TYPE orderStatus AS ENUM ('active', 'complete');

CREATE TABLE orders(id SERIAL PRIMARY KEY, status orderStatus, user_id bigint REFERENCES users(id));