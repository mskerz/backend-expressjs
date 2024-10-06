# Job Portal REST API

Welcome to the Job Portal REST API project! This API is built using Express.js and follows the Model-Controller architecture pattern. It provides endpoints for managing job posts and user authentication.


## Features


- Refresh tokens 
- Error handling and validation.

## Technologies

- **Node.js** - JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js** - Web framework for Node.js.
- **Sequelize** - ORM for Node.js that supports various SQL databases.
- **JWT** - JSON Web Tokens for authentication.
- **dotenv** - For managing environment variables.
- **MySQL** - Database for storing job posts and user data.
- **Nodemon**

## Setup

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mskerz/backend-expressjs.git
    cd backend-expressjs
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your configuration. For example:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=job_portal
    AUTH_SECRET_KEY=your_secret_key
    ```

4. **Run database migrations:**

    ```bash
    npm run migrate
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.


