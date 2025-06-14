# 🚀 Express TypeScript Starter with Sequelize & Jest

This is a professional-grade boilerplate for building scalable REST APIs using:

- **Express.js** – Lightweight web framework
- **TypeScript** – Type-safe, modern JavaScript
- **Sequelize** – SQL ORM for PostgreSQL, MySQL, etc.
- **Jest** – Testing framework
- **Supertest** – HTTP assertions

---
Author: phat_tran
---

## 📁 Project Structure

```

project-root/
├── src/
│ ├── config/ # Environment and database configs
│ ├── controllers/ # Route handlers
│ ├── models/ # Sequelize models
│ ├── routes/ # Express routes
│ ├── services/ # Business logic
│ ├── middlewares/ # Custom Express middlewares
│ ├── utils/ # Utility functions
│ ├── app.ts # Main Express app setup
│ └── server.ts # Entry point
├── tests/ # Jest test cases
├── .env # Environment variables
├── tsconfig.json # TypeScript config
├── jest.config.ts # Jest config
├── package.json
└── README.md

```

---

## 🛠️ Installation

1. **Clone the repo**:

```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Install dependencies:

``` yarn install ```

3. Set up .env file: Create a .env file in the root directory:

```
  PORT=3000
  DB_NAME=your_db_name
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_HOST=localhost
```

## 🧪 Testing

We use Jest and Supertest for unit and integration tests.

Example test file: tests/user.test.ts

To run all tests:

``` npm test ```

## 🧱 Built-in Features

✅ Sequelize ORM with PostgreSQL
✅ TypeScript-first setup with ES module support
✅ Jest testing framework
✅ Express route/controller/service architecture
✅ Error handling and JSON middleware
✅ Modular and scalable folder structure


## ✍️ Example API: /api/users

```
  GET /api/users – List all users
  POST /api/users – Create a new user
```

###  Contributing
  1. Fork the repository
  2. Create your feature branch: git checkout -b feature/my-feature
  3. Commit your changes
  4. Push to the branch: git push origin feature/my-feature
  5. Submit a pull request 🚀
