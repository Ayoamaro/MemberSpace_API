<div align="center">
  <a href="https://memberspace-api.onrender.com/">
    <img
      src="docs/images/logo.png"
      alt="MemberSpace Logo"
    />
  </a>
  <p />
  <p>
    <b>
      REST API for user management with authentication and role-based authorization (JWT).
    </b>
  </p>

<p align="center">
    <a href="https://memberspace-api.onrender.com/">Live Demo</a>
    <span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
    <a href="#-introduction">Introduction</a>
    <span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
    <a href="#-stack">Stack</a>
    <span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
    <a href="#-features">Features</a>
    <span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
    <a href="#-project-structure">Project Structure</a>
    <span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
    <a href="#-credentials">Credentials</a>
    <span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
    <a href="#-license">License</a>
</p>

</div>

---

## 📝 Introduction

**MemberSpace API** is a scalable REST API built with **Node.js + Express + TypeScript** that provides:

- User authentication (JWT)
- Role-based authorization (USER / ADMIN)
- Secure password hashing
- Input validation
- Full CRUD for users (Admin only)

The API is designed with clean architecture, modular structure, and production-ready practices.

---

## 🛠️ Stack

- ⚙️ **Backend:** Node.js + Express
- 🟦 **Language:** TypeScript
- 🍃 **Database:** MongoDB + Mongoose
- 🔐 **Authentication:** JWT (jsonwebtoken)
- 🔑 **Security:** bcrypt, Helmet, CORS
- 🧪 **Validation:** Zod
- 📄 **Documentation:** Swagger (OpenAPI)
- ☁️ **Deploy:** Render

---

## ✨ Features

- 🔐 JWT authentication (register / login)
- 👥 Role-based system: USER / ADMIN
- 🛑 Routes protected by middleware
- ⚙️ User management (ADMIN only)
- ✅ Data validation with Zod
- 🔒 Passwords hashed with bcrypt
- 📄 Interactive documentation with Swagger
- 🧱 Clean architecture (Controller → Service → Model)
- ⚡ Production-ready API

---

## 💾 Credentials

You can use this example to test secure endpoints:

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

## 📁 Project Structure

```bash
src/
├── config/
│   ├── db.ts
│   ├── env.ts
│   └── swagger.ts
│
├── middlewares/
│   ├── authenticate.ts
│   ├── authorize.ts
│   ├── errorHandler.ts
│   └── notFound.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   └── auth.service.ts
│   │
│   └── users/
│       ├── user.model.ts
│       ├── users.controller.ts
│       ├── users.routes.ts
│       ├── users.schema.ts
│       └── users.service.ts
│
├── routes/
│   └── health.ts
│
├── types/
│   └── express.d.ts
│
├── utils/
│   ├── apiResponse.ts
│   ├── hash.ts
│   ├── httpError.ts
│   └── jwt.ts
│
├── app.ts
└── server.ts
```

---

## 🔑 License

- This project is licensed under the [MIT](https://github.com/Ayoamaro/MemberSpace_API/blob/main/LICENSE) License.
