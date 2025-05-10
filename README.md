# Node.js Authentication Application

This project is a Node.js application that implements user authentication using Express, Passport.js, and PostgreSQL. It provides a simple sign-up and login functionality, user profile management, and additional features such as messaging, admin controls, and a secret membership club.

## Project Structure

```
node-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── config
│   │   └── database.js       # Database connection setup
│   │   └── passportConfig.js # Passport setup
│   ├── controllers
│   │   ├── authController.js  # Authentication-related request handlers
│   │   ├── userController.js  # User-related request handlers
│   │   └── messageController.js # Message-related request handlers
│   ├── middlewares
│   │   └── authMiddleware.js  # Middleware for authentication checks
│   ├── routes
│   │   ├── authRoutes.js      # Authentication routes setup
│   │   ├── userRoutes.js      # User routes setup
│   │   └── messageRoutes.js   # Message routes setup
│   └── views
│       ├── index.ejs          # Main page template
│       ├── sign-up-form.ejs   # Sign-up form template
│       ├── messages.ejs       # Messages page template
│       └── admin-dashboard.ejs # Admin dashboard template
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # NPM configuration file
└── package-lock.json           # NPM lock file
```

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd node-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your database connection string and any other necessary environment variables:

   ```
   DATABASE_URL=your_database_connection_string
   SESSION_SECRET=your_session_secret
   MEMBERSHIP_CODE=your_membership_code
   ```

4. Set up the database by running the SQL scripts provided in the `Database Schema` section.

## Usage

1. Start the application:

   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Features

- **User Authentication**: Sign-up and login functionality using Passport.js.
- **Secure Password Storage**: Passwords are securely hashed using bcrypt.
- **Messaging System**: Users can send and view messages. Messages are tied to user accounts.

## Database Schema

Run the following SQL scripts to set up the database:

```sql
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
);
```

## License

This project is licensed under the MIT License.
