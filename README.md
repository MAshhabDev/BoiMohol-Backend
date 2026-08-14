# 📚 BoiMohol - Enterprise Multi-Sector Book E-Commerce Backend API

![Node.js](https://img.shields.io/badge/Node.js-v24-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-v5-black?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-336791?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis)

**BoiMohol Backend** is a production-grade, domain-driven RESTful API server built for an online book store platform, based on the **NEUROSOFTIC Multi-Sector E-Commerce SRS v1.0** specifications.

---

## ✨ Key Technical Highlights & Features

- 🔑 **Authentication & Security (RBAC):**
  - JWT Access Token (Short-lived) & Rotating Refresh Token (HTTP-Only Cookie).
  - Google OAuth 2.0 Integration.
  - Strict Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `CUSTOMER`).
  - Password Hashing using `bcryptjs` and Zod v4 Schema Validations.

- 📖 **Domain-Driven Book Catalog & Attributes:**
  - Dedicated **Author** profiles & **Publisher** directory with clean URL Slugs.
  - **Dynamic Category Engine** with 2-digit Category Prefixes (e.g. `12` for Literature).
  - **Sample PDF Excerpt Preview** links for readers.
  - Support for `PAPERBACK` and `HARDCOVER` bindings.

- 🏷️ **12-Digit Automatic Barcode & SKU Generator Algorithm (SRS Compliant):**
  - Custom mathematical barcode generator:
    $$\text{Barcode} = \text{CategoryPrefix (2)} + \text{BindingCode (4)} + \text{Serial (4)} + \text{CheckDigits (2)}$$
  - Generates warehouse-scanner friendly 12-digit barcodes (e.g., `120001004205`) and unique SKUs (`BM-12-0042`).

- 🛒 **Shopping Cart & Immutable Order Engine:**
  - Real-time cart management with stock availability validation.
  - **Data Snapshot Pattern:** Stores immutable price, title, and customer address snapshots in orders to preserve historical invoice data.
  - Atomic database transactions (`prisma.$transaction`) for order creation, stock decrement, and cart resets.

- 💳 **Payment & Due Collection Engine:**
  - **Cash on Delivery (COD)** workflow.
  - **SSLCommerz Payment Gateway Integration** supporting bKash, Nagad, Rocket, and Bank Cards.
  - **Server-to-Server Webhook / IPN Verification** (`/payments/success`) for 100% secure payment validation.

- ⭐ **Customer Reviews & Ratings:**
  - Verified purchase book review system with 1-5 star ratings.

---

## 🛠️ Technology Stack

- **Runtime & Framework:** Node.js (v24), Express.js (v5), TypeScript
- **Database & ORM:** PostgreSQL, Prisma 7 ORM
- **Cache & Storage:** Redis, Nodemailer (OTP / Email Receipts)
- **Authentication:** JWT, Google OAuth 2.0, bcryptjs
- **Validation:** Zod v4
- **Formatting & Linter:** Biome

---

## 📁 Modular Project Directory Structure

```text
src/
├── app/
│   ├── config/             # Environment variables & DB instance configs
│   ├── middleware/         # Auth guards, validation & global error handlers
│   ├── utils/              # API response standardizer, JWT helpers, catchAsync
│   └── module/             # Feature Modules (Domain-Driven)
│       ├── auth/           # Login, Register, Google OAuth, Tokens
│       ├── author/         # Writer profiles & CRUD
│       ├── publisher/      # Publishing houses & CRUD
│       ├── category/       # Genres & 2-Digit Category Prefixes
│       ├── book/           # Book Master, 12-Digit Barcode Generator & Filtering
│       ├── cart/           # User Shopping Cart
│       ├── order/          # Checkout Engine, Immutable Snapshots & Stock Decrement
│       ├── payment/        # SSLCommerz & COD Payment Webhooks
│       └── review/         # Book ratings & customer feedback
├── app.ts                  # Express Application bootstrap
└── server.ts               # Database & server listener
```

---

## 🌐 Environment Variables Setup (`.env`)

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/boimohol_db?schema=public"

JWT_ACCESS_SECRET=boimohol_access_secret_key_123456
JWT_REFRESH_SECRET=boimohol_refresh_secret_key_123456
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10

SSL_STORE_ID=boimohol_sandbox
SSL_STORE_PASSWD=boimohol_sandbox@ssl
```

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/BoiMohol-Backend.git
   cd BoiMohol-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Database & Run Migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init_boimohol
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

---

## 📌 Summary of API Endpoints

| Module | Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth/register` | `POST` | Public | Register customer account |
| **Auth** | `/api/v1/auth/login` | `POST` | Public | Login with Email & Password |
| **Auth** | `/api/v1/auth/google` | `POST` | Public | Google Social Login |
| **Auth** | `/api/v1/auth/me` | `GET` | Protected | Fetch profile of logged-in user |
| **Authors** | `/api/v1/authors` | `GET / POST` | Public / Admin | List or create authors |
| **Publishers**| `/api/v1/publishers` | `GET / POST` | Public / Admin | List or create publishers |
| **Categories**| `/api/v1/categories` | `GET / POST` | Public / Admin | List or create categories with prefix |
| **Books** | `/api/v1/books` | `GET / POST` | Public / Admin | Search books or add book (Auto Barcode) |
| **Books** | `/api/v1/books/:slug` | `GET` | Public | View book details & PDF sample link |
| **Cart** | `/api/v1/carts` | `GET / POST` | Customer | View or add items to shopping cart |
| **Orders** | `/api/v1/orders` | `POST` | Customer | Checkout order & create invoice snapshot |
| **Payments** | `/api/v1/payments/initiate`| `POST` | Customer | Initiate SSLCommerz / Online Gateway session |
| **Payments** | `/api/v1/payments/success` | `POST` | Gateway | Secure server-to-server webhook verification |

---

## 📝 License

This project is licensed under the MIT License - feel free to use and customize for your retail e-commerce applications.
