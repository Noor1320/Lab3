# CRUD and Authentication App

This application allows users to perform CRUD operations on their personal items and provides both local authentication (username/password) and GitHub OAuth for logging in.

## Features
- **CRUD Functionality:** Users can Create, Read, Update, and Delete items linked to their account.
- **Local Authentication:** Users can register and log in using a secure username and password.
- **OAuth Authentication:** Users can log in via their GitHub accounts.
- **Access Control:** Only authenticated users can access CRUD routes, and sensitive data is secured using environment variables.


## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas or a local MongoDB instance.
- GitHub Developer Account for OAuth credentials.

### Steps
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root folder with the following variables:
    ```plaintext
    GOOGLE_CLIENT_ID=503069890800-5lkojbn0nhji958e7raasnkakgo0dd5k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
MONGO_URI=mongodb+srv://noordeepkaurbhullar:crudappauth@cluster0.bi4ue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=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

GITHUB_CLIENT_ID=Ov23liW32QIUp9TjD6hz
GITHUB_CLIENT_SECRET=a61070c024970ce68500268839deadd742292108
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
    MONGO_URI=your_mongo_connection_string
    SESSION_SECRET=your_session_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
    ```
4. Start the server:
    ```bash
    npm start
    ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Routes

### Authentication
- **`GET /register`**: Displays the registration form.
- **`POST /register`**: Registers a new user with username and password.
- **`GET /login`**: Displays the login form.
- **`POST /login`**: Logs in a user.
- **`GET /auth/github`**: Initiates GitHub login.
- **`GET /auth/github/callback`**: Callback route for GitHub OAuth.
- **`GET /logout`**: Logs out the user.

### CRUD Operations
- **`POST /api/items`**: Creates a new item.
- **`GET /api/items`**: Retrieves all items belonging to the logged-in user.
- **`PUT /api/items/:id`**: Updates an item by its ID.
- **`DELETE /api/items/:id`**: Deletes an item by its ID.

---

## Access Control
- All routes under `/api` are protected and can only be accessed by authenticated users.
- Sensitive data like database credentials and session secrets are stored in environment variables for security.



## Author
Noordeep Kaur


