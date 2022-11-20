"# online-shoping" 
## About
A simple e-commerce Node js web application that handles authentication for users as well as creation, updating, listing, and deleting products.

## Setup
- Git clone this repository
- Install mongo compass
- `cd` into the directory then run `node index.js`

### Authentication
A user can login with their credentials using
```javascript
POST /users/auth
{
  "email": "XXXXX",
  "password": "YYYYY",
}
```
A user can sign up with their credentials using
```javascript
POST /users
{
  "name": "AAAAAA",
  "Email": "XXXXX",
  "password: "YYYYY"
  
}
```
<b>Users passwords are hashed before being inserted into the database</b>

### Viewing Products
All users are allowed to see the list of products stored in the database using
```javascript
GET /brows
```

### Managing Products
 users are allowed to add, remove, edit products existing in the database using the following endpoints by passing the product id in the query and the web token in the header with the name x-auth-token
```javascript
Create
POST /products
{
    "name": "pen",
    "quantity": 20,
    "price": 200,
    "userId": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```
```javascript
Edit
PUT /products
{
    "name": "pen",
    "quantity": 20,
    "price": 200,
    "userId": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```
```javascript
Delete
DELETE /products
```
<b>These endpoints are protected via JWT middleware.</b>
