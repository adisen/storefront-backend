# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: GET /products
- Show: GET /products/:id
- Create: POST /products [token required]
  - Requires the product objects {category: string, name: string, price: integer}

#### Users

- Index: GET /users [token required]
- Show: GET /users/:id [token required]
- Create User: POST /users/
  - Requires the user object {firstname: string, lastname: string, username: string, password: string}

#### Orders

- Current Order by user: GET /orders [token required]
- Create Order: POST /orders
  - Requires the order object {product_id: number, quantity: number}

## Data Shapes

#### Product

- id
- name
- price
- category

#### User

- id
- firstname
- lastname
- password
- username

#### Orders

- id
- id of each product in the order(product_id)
- quantity of each product in the order
- user_id
- status of order (active or complete)
