

# 🛍 E-Commerce API Documentation

---

## 👤 User Schema

| Field       | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `_id`       | ObjectId | Unique user identifier |
| `name`      | String   | User’s full name       |
| `email`     | String   | Unique email address   |
| `password`  | String   | Hashed password        |
| `image`     | String   | Profile image URL      |
| `isAdmin`   | Boolean  | Admin role flag        |
| `createdAt` | Date     | Auto-generated         |
| `updatedAt` | Date     | Auto-generated         |

---

## 📦 Product Schema

| Field          | Type          | Description                    |
| -------------- | ------------- | ------------------------------ |
| `_id`          | ObjectId      | Unique product identifier      |
| `name`         | String        | Product name (unique, trimmed) |
| `brand`        | String        | Product brand                  |
| `image`        | String        | Product image URL              |
| `price`        | Number        | Product price                  |
| `colors`       | Array<String> | Available color options        |
| `sizes`        | Array<String> | Available size options         |
| `countInStock` | Number        | Available inventory count      |
| `category`     | String        | Product category (indexed)     |
| `rating`       | Number        | Average rating (0–5)           |
| `createdAt`    | Date          | Auto-generated *(optional)*    |
| `updatedAt`    | Date          | Auto-generated *(optional)*    |

---

## 🛒 Cart Schema

| Field             | Type     | Description                   |
| ----------------- | -------- | ----------------------------- |
| `_id`             | ObjectId | Unique cart ID                |
| `userId`          | ObjectId | Reference to `User`           |
| `items`           | Array    | List of cart items            |
| `items.productId` | ObjectId | Reference to `Product`        |
| `items.quantity`  | Number   | Quantity (default: 1, min: 1) |
| `items.color`     | String   | Selected color                |
| `items.size`      | String   | Selected size                 |
| `total`           | Number   | Total cart price              |
| `createdAt`       | Date     | Auto-generated                |
| `updatedAt`       | Date     | Auto-generated                |

---

## 🧾 Order Schema

| Field             | Type     | Description                                                              |
| ----------------- | -------- | ------------------------------------------------------------------------ |
| `_id`             | ObjectId | Unique order ID                                                          |
| `userId`          | ObjectId | Reference to `User` placing the order                                    |
| `items`           | Array    | List of ordered items                                                    |
| `items.productId` | ObjectId | Reference to `Product`                                                   |
| `items.quantity`  | Number   | Quantity of the product                                                  |
| `items.color`     | String   | Selected color                                                           |
| `items.size`      | String   | Selected size                                                            |
| `total`           | Number   | Total order price                                                        |
| `orderStatus`     | String   | Status of order (`pending`, `paid`, `shipped`, `delivered`, `cancelled`) |
| `paymentMethod`   | String   | Method of payment (`cod`, `card`, `upi`, `paypal`)                       |
| `paymentStatus`   | String   | Payment status (`pending`, `completed`, `failed`)                        |
| `shippingAddress` | String   | Shipping address of the user                                             |
| `createdAt`       | Date     | Auto-generated                                                           |
| `updatedAt`       | Date     | Auto-generated                                                           |

---

# 🔐 Authentication API

### Sign Up

**POST** `/api/auth/signup`

```json
{
  "name": "user1",
  "email": "test1@gmail.com",
  "password": "pass123"
}
````

---

### Sign In

**POST** `/api/auth/signin`

```json
{
  "email": "test@gmail.com",
  "password": "pass123"
}
```

---

### Change Password

**POST** `/api/auth/changePass`

```json
{
  "name": "user1",
  "email": "test1@gmail.com",
  "password": "pass123",
  "newPassword": "pass1234"
}
```

---

### Log Out

**POST** `/api/auth/logout`





---

# 📦 Product API

### Get All Products

**GET** `/api/product/all`

---

### Get Product by ID

**GET** `/api/product/id/{productId}`

---

### Search by Product Name

**GET** `/api/product/search?q=shirt`

---

### Find Products by Category / Brand

**GET** `/api/product/find?category=Apparel`
**GET** `/api/product/find?brand=abc`

---

### Add Product

**POST** `/api/product/addProduct`

```json
{
  "name": "shirt2",
  "brand": "abc",
  "price": 699,
  "colors": ["Blue", "Red"],
  "sizes": ["M", "X", "XS", "XL"],
  "countInStock": 12,
  "category": "Apparel",
  "rating": 5
}
```

---

# 🛒 Cart API

### Get Cart

**GET** `/api/cart/getCart`

---

### Add Product to Cart

**POST** `/api/cart/addToCart`

```json
{ 
  "productId": "6943d617056bdbc4b430536c",
  "quantity": 2,
  "color": "red",
  "size": "M"
}
```

---

### Remove Product from Cart

**POST** `/api/cart/removeFromCart`

```json
{ 
  "productId": "6943d617056bdbc4b430536c",
  "color": "red",
  "size": "M"
}
```

---

# 📝 Order API

### Place Order

**POST** `/api/order/placeOrder`

```json
{ 
  "cartId": "69453d352805c961c12b6ea2",
  "shippingAddress": "123 street",
  "paymentMethod": "cod"
}
```

---

### Get User Order by ID

**GET** `/api/order/id/{orderId}`

---

### Get All User Orders

**GET** `/api/order/all`

---

### Cancel Order

**POST** `/api/order/cancel`

```json
{ 
  "orderId": "69456b1ceec4bd8c48081c6d"
}
```

```


