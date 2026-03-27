# Node Express Modular Starter

A production-ready, modular, and reusable Node.js Express starter package designed for building scalable SaaS applications. Built with TypeScript, clean architecture, and best practices in mind.

## 🚀 Features

- **Modular Architecture**: Feature-based modules (Controller, Service, Model, Validation, Interface, Routes) for better scalability.
- **Production-Grade Authentication**: robust JWT-based authentication (Access & Refresh Tokens) with secure cookie handling.
- **Strict Validation**: Zod-based schema validation for request bodies, queries, and params.
- **Centralized Error Handling**: Global error handler catching Zod, Mongoose, and App errors with consistent responses.
- **Security First**: Helmet protection, Rate limiting, CORS configuration, and Data sanitization.
- **Database Best Practices**: Mongoose with optimized connection, proper indexing, and schema design.
- **File Uploads**: Integrated Multer and Cloudinary for secure file storage.
- **Logging**: Production-ready logging with Winston.
- **Developer Experience**: ESLint, Prettier, Husky (optional setup), and typed configurations.
- **Email & OTP**: Built-in utilities for sending emails and handling One-Time Passwords (OTP).

## 📂 Project Structure

```
src/
├── config/             # Environment configuration (Zod validated)
├── errors/             # Custom Error classes and handlers
├── interface/          # Global interfaces
├── middlewares/        # Express middlewares (Auth, Validation, Errors)
├── modules/            # Feature modules (User, Auth, etc.)
│   ├── auth/
│   └── user/
├── routes/             # Centralized router
├── utils/              # Shared utilities (Logger, Pick, Pagination, etc.)
├── app.ts              # Express app setup
└── server.ts           # Entry point (Database connection & Server start)
```

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd node-express-modular-starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy `.env.example` to `.env` and fill in the required values.
   ```bash
   cp .env.example .env
   ```

   **Required Variables:**
   - `MONGO_URI`: Your MongoDB connection string.
   - `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET`: Secrets for JWT.
   - `CLOUDINARY_*`: Cloudinary credentials for file uploads.

4. **Run the server:**
   ```bash
   npm run dev
   ```

## 📜 Scripts

- `npm run dev`: Start development server with hot-reload.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the production server (after build).
- `npm run lint`: Run ESLint.
- `npm run lint:fix`: Fix linting errors.
- `npm run format`: Format code with Prettier.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the ISC License.
