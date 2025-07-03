# 📱 Live E-commerce Platform Documentation

## 🧠 Overview

The application is a **live e-commerce platform** where users can **buy and sell products**, with an **interactive livestreaming** feature for sellers. This enables any user to showcase products **live**, allowing real-time **engagement**, **product tagging**, and **instant purchases** during live sessions. 

Users are **dual-role participants** — they can be both buyers and sellers on the same platform.

---

## 🔥 Key Features

### 👤 User Roles

- **Unified User Account**: Every user can:
  - Browse products and place orders (Buyer role).
  - Upload and manage their products (Seller role).
  - Go live and showcase products to viewers.

- **Seller Dashboard**:
  - Manage products (Add, Edit, Delete).
  - Manage orders (Track, Dispatch, Cancel).
  - Schedule or start live sessions.
  - See analytics for product views, live session engagement, and orders.

### 🛍️ Product Listing

- Any user can create a product listing with:
  - Product Title
  - Description
  - Images / Videos
  - Price
  - Quantity
  - Tags and Categories
  - Visibility toggle (Private/Public)

### 📺 Live Selling

- **Technology Used**: Agora SDK
- Sellers can:
  - Pre-select products to feature in a live session.
  - Start a live video session visible to all platform users.
  - Tag products in real-time during the live, allowing viewers to see and purchase them instantly.
- Viewers can:
  - Interact via live chat.
  - Click on tagged products to view details and place orders.

### 📦 Order and Delivery System

- **Delivery Partner**: Shiprocket API Integration
- Features:
  - Automated shipment creation and tracking via Shiprocket.
  - Address and phone validation.
  - Status tracking (Packed, Shipped, Delivered).
  - Return/Cancel options.

### 🛒 E-commerce Core Features

- Product Search and Filter
- Add to Cart and Buy Now options
- Secure Checkout (Cash on Delivery, UPI, Cards)
- Order History and Tracking
- Wishlist / Saved Items

---

## 🧰 Tech Stack

| Layer              | Technology            |
|-------------------|-----------------------|
| **Frontend**       | React / React Native |
| **Backend**        | Node.js / Express.js |
| **Database**       | MySQL                |
| **Live Streaming** | Agora.io              |
| **Delivery**       | Shiprocket API       |
| **Authentication** | JWT / OAuth          |
| **Media Storage**  | Cloudinary / AWS S3  |

---

## 🔐 User Flow

### 1. **User Registration / Login**
- Sign up via email/phone.
- Social login (Optional).
- Role is dynamic — any user can be a seller or buyer.

### 2. **Buyer Flow**
- Browse categories or search.
- View product details.
- Add to cart or buy now.
- Track order via dashboard.

### 3. **Seller Flow**
- Access Seller Dashboard.
- Add new product listings.
- Schedule or start a live session.
- Tag products during live.
- Receive and fulfill orders.

### 4. **Live Session Flow**
- Seller goes live using Agora.
- Seller tags products.
- Viewers click to purchase tagged items.
- Orders get placed and routed through Shiprocket.

---

## 📁 Database Schema (Simplified)

### Users Table
- id (PK)
- name
- email
- password (hashed)
- isSeller (boolean)
- profileImage
- address
- created_at

### Products Table
- id (PK)
- user_id (FK)
- name
- description
- price
- quantity
- images (JSON)
- isLiveTaggable (boolean)
- created_at

### Orders Table
- id (PK)
- buyer_id (FK)
- product_id (FK)
- seller_id (FK)
- status (Pending, Shipped, Delivered, Cancelled)
- shiprocket_order_id
- total_amount
- created_at

### LiveSessions Table
- id (PK)
- host_id (FK to user)
- title
- started_at
- ended_at
- status (Scheduled, Live, Ended)

### LiveProductTags Table
- id (PK)
- live_session_id (FK)
- product_id (FK)
- tagged_at (timestamp)

---

## 🧩 Integration

### 🔗 Shiprocket
- Sync orders for delivery
- Real-time tracking
- Pincode serviceability check

### 🔗 Agora
- Real-time streaming
- SDK integration for mobile & web
- Event listener for product tagging