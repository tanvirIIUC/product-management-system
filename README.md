# 🛒 Product Management System

A full-stack product management system built with **Next.js 14**, **NextAuth**, **TypeScript**, **MongoDB**, **Mongoose**, **Zod**, **React Hook Form**, and **bcrypt**. Admins can manage products via a secure dashboard, and users can browse products.

---

## 🚀 Features

- 🔐 Authentication using NextAuth (Credentials)
- 🛡 Role-based access (Admin & User)
- 📦 Product CRUD operations for Admins
- ✅ Form validation using Zod and React Hook Form
- 💾 MongoDB integration using Mongoose
- 🔐 Password hashing with bcrypt
- ⚙️ Server Actions instead of traditional API routes

---

## 🧪 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, React Hook Form
- **Backend**: Next.js Server Actions, Mongoose, MongoDB
- **Authentication**: NextAuth (Credentials)
- **Validation**: Zod
- **Database**: MongoDB Atlas
- **Security**: bcrypt, JWT

---

## 📦 Installation & Setup

Follow the steps below to get the application up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/product-management-system.git
cd product-management-system

----------
.env.local
NEXT_PUBLIC_MONGODB_URL=mongodb+srv://mongooseproject:i7sEySjchbKjejj1@cluster0.fgemqio.mongodb.net/product-management-system
NEXTAUTH_SECRET=secret

----for admin login---
Email: admin@gmail.com
Password: 123456
