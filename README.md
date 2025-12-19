
---

# 🛒 E-Commerce API Documentation

A comprehensive backend API for an e-commerce platform, featuring user authentication, product management, shopping carts, and order processing.

## 🗄️ Database Schemas

### User Schema
| Field | Type | Description |
| --- | --- | --- |
| `_id` | `ObjectId` | Unique user identifier |
| `name` | `String` | User’s full name |
| `email` | `String` | Unique email address |
| `password` | `String` | Hashed password |
| `image` | `String` | Profile image URL |
| `isAdmin` | `Boolean` | Admin role flag |
| `createdAt` | `Date` | Timestamp of creation |

### Product Schema

| Field | Type | Description |
| --- | --- | --- |
| `_id` | `ObjectId` | Unique product identifier |
| `name` | `String` | Product name (unique, trimmed) |
| `brand` | `String` | Product brand |
| `price` | `Number` | Product price |
| `colors` | `Array<String>` | Available color options |
| `sizes` | `Array<String>` | Available size options |
| `countInStock` | `Number` | Inventory count |
| `category` | `String` | Product category (indexed) |
| `rating` | `Number` | Average rating (0–5) |

---

## 🔑 Authentication API

### Sign Up

`POST /api/auth/signup`

```json
{
  "name": "user1",
  "email": "test1@gmail.com",
  "password": "pass123"
}

```

### Sign In

`POST /api/auth/signin`

```json
{
  "email": "test@gmail.com",
  "password": "pass123"
}

```

### Change Password

`POST /api/auth/changePass`

```json
{
  "email": "test1@gmail.com",
  "password": "current_password",
  "newPassword": "new_password_123"
}

```

### Log Out

`POST /api/auth/logout`
*Note: Typically logout identifies the user via a Token/Session, but based on your schema:*

```json
{
  "email": "test1@gmail.com"
}

```

---

## 📦 Product API

| Action | Method | Endpoint |
| --- | --- | --- |
| **Get All Products** | `GET` | `/api/product/all` |
| **Get Product by ID** | `GET` | `/api/product/id/:id` |
| **Search by Name** | `GET` | `/api/product/search?q=shirt` |
| **Filter by Category** | `GET` | `/api/product/find?category=Apparel` |
| **Filter by Brand** | `GET` | `/api/product/find?brand=Nike` |

### Add Product (Admin Only)

`POST /api/product/addProduct`

```json
{
  "name": "Blue Denim Shirt",
  "brand": "BrandX",
  "price": 699,
  "colors": ["Blue", "Red"],
  "sizes": ["M", "L", "XL"],
  "countInStock": 12,
  "category": "Apparel",
  "rating": 5
}

```

---

## 🛒 Cart API

### Add Item to Cart

`POST /api/cart/addToCart`

```json
{ 
  "productId": "6943d617056bdbc4b430536c",
  "quantity": 2,
  "color": "red",
  "size": "M"
}

```

### Remove Item from Cart

`POST /api/cart/removeFromCart`

```json
{ 
  "productId": "6943d617056bdbc4b430536c",
  "color": "red",
  "size": "M"
}

```

---

## 🚚 Order API

### Place Order

`POST /api/order/placeOrder`

```json
{ 
  "cartId": "69453d352805c961c12b6ea2",
  "shippingAddress": "123 Street, City, Country",
  "paymentMethod": "cod"
}

```

### Order Management

* **Get All User Orders:** `GET /api/order/all`
* **Get Order by ID:** `GET /api/order/id/:id`
* **Cancel Order:** `POST /api/order/cancel` (Body: `{ "orderId": "ID" }`)

---
