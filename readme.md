# REST API Documentation

This REST API  provides functionality for user authentication, posting, and commenting.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- Helmet
- Morgan

## Setup

1. Clone the repository:


2. Install dependencies:


3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:


4. Start the server:


## Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
  - Request Body: `{ username, email, password }`
- **POST /api/auth/login**: Login with existing credentials.
  - Request Body: `{ email, password }`

### Users

- **PUT /api/users/:id**: Update user information.
  - Request Parameters: `id` (user ID)
  - Request Body: `{ username, email, password }`
- **DELETE /api/users/:id**: Delete a user.
  - Request Parameters: `id` (user ID)
- **GET /api/users/:id**: Get user information.
  - Request Parameters: `id` (user ID)

### Posts

- **POST /api/posts**: Create a new post.
  - Request Body: `{ userId, desc, img }`
- **PUT /api/posts/:id**: Update a post.
  - Request Parameters: `id` (post ID)
  - Request Body: `{ userId, desc, img }`
- **DELETE /api/posts/:id**: Delete a post.
  - Request Parameters: `id` (post ID)
- **PUT /api/posts/:id/like**: Like or dislike a post.
  - Request Parameters: `id` (post ID)
  - Request Body: `{ userId }`
- **GET /api/posts/:id**: Get post by ID.
  - Request Parameters: `id` (post ID)
- **POST /api/posts/:postId/comments**: Add a comment to a post.
  - Request Parameters: `postId` (post ID)
  - Request Body: `{ userId, commentText }`

## Contributing

Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](link-to-contributing-file).

 