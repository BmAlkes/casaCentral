# MERN Stack Real Estate Website

<img src="https://res.cloudinary.com/landingpage2/image/upload/v1742229795/Screenshot_32_r2p6rd.png" alt="Web page" >

A modern and responsive real estate platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Prisma** for database management and **Mantine UI** for styling. This project enables users to browse, list, and manage properties efficiently.

## Features

- 🏡 **Property Listings** – Browse, search, and filter real estate properties.
- 🔍 **Advanced Search & Filters** – Find properties based on location, price, type, and more.
- 📋 **Property Details Page** – View detailed property descriptions, images, and features.
- 📝 **User Authentication** – Secure login and registration (JWT-based authentication).
- 📊 **Admin Dashboard** – Manage users, listings, and transactions.
- 💾 **Database Integration** – Prisma ORM with MongoDB for efficient data handling.
- 🎨 **Modern UI/UX** – Styled with Mantine UI for a professional look and feel.
- ⚡ **Optimized Performance** – Fast API responses with Express.js and Node.js.

## Tech Stack

| Technology | Description |
|------------|-------------|
| MongoDB    | NoSQL database for storing property data |
| Express.js | Backend framework for API development |
| React.js   | Frontend library for building UI components |
| Node.js    | JavaScript runtime for server-side logic |
| Prisma     | ORM for database management and querying |
| Mantine UI | UI library for modern and accessible design |

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/mern-real-estate.git
   cd mern-real-estate
   ```

2. **Install dependencies:**
   ```sh
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the `server` directory with the following:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     PORT=5000
     ```

4. **Run the application:**
   ```sh
   # Start backend server
   cd server
   npm run dev
   
   # Start frontend React app
   cd ../client
   npm start
   ```

5. **Access the application:**
   - Open `http://localhost:3000` in your browser.

## Folder Structure

```
mern-real-estate/
│── server/             # Backend (Express.js, Prisma, MongoDB)
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── middleware/    # Authentication, validation, etc.
│   ├── config/        # Database configuration
│   └── index.js       # Entry point
│
│── client/             # Frontend (React, Mantine UI)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # App pages (Home, Listings, Details, etc.)
│   │   ├── context/     # State management
│   │   ├── api/         # API service calls
│   │   ├── assets/      # Images, icons, styles
│   │   └── App.js       # Main app file
│
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature-branch`
3. **Make changes and commit:** `git commit -m "Add new feature"`
4. **Push to the branch:** `git push origin feature-branch`
5. **Open a Pull Request**

## License

This project is licensed under the **MIT License** – feel free to use and modify it as needed.

## Contact

For any inquiries, reach out to [your-email@example.com](mailto:your-email@example.com) or open an issue in the repository.

---

**Happy Coding! 🚀**

