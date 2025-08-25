### Exercise Tracker Microservice

This project is a backend microservice that allows users to track their exercises. It's a solution for the FreeCodeCamp Back End Development and APIs certification. The service provides endpoints to create users, add exercise logs, and retrieve a user's exercise history.

-----

### How to Use the API

The API provides several endpoints for managing users and their exercises. All responses are in JSON format.

#### `POST` `/api/users`

  - **Description**: Creates a new user.
  - **Request Body**: A form data object with a `username` key.
  - **Success Response**: Returns a JSON object with the `username` and a unique `_id`.
    ```json
    {
      "username": "test_user",
      "_id": "651a998b3c67530e1a1b1a1b"
    }
    ```

-----

#### `GET` `/api/users`

  - **Description**: Retrieves a list of all users.
  - **Success Response**: Returns a JSON array of all user objects.
    ```json
    [
      {
        "username": "test_user",
        "_id": "651a998b3c67530e1a1b1a1b"
      }
    ]
    ```

-----

#### `POST` `/api/users/:_id/exercises`

  - **Description**: Adds a new exercise to a user's log.
  - **Request Body**: A form data object with `description`, `duration`, and an optional `date`.
  - **Success Response**: Returns the user object with the newly added exercise details.
    ```json
    {
      "_id": "651a998b3c67530e1a1b1a1b",
      "username": "test_user",
      "description": "running",
      "duration": 30,
      "date": "Mon Jan 01 2024"
    }
    ```

-----

#### `GET` `/api/users/:_id/logs`

  - **Description**: Retrieves a full exercise log for a user. The log can be filtered and limited using query parameters.
  - **Query Parameters**:
      - `from` (optional): A date string (`YYYY-MM-DD`) to filter exercises from.
      - `to` (optional): A date string (`YYYY-MM-DD`) to filter exercises up to.
      - `limit` (optional): An integer to limit the number of exercises returned.
  - **Success Response**: Returns a JSON object containing user details, the total exercise count, and a `log` array of exercises.
    ```json
    {
      "username": "test_user",
      "count": 1,
      "_id": "651a998b3c67530e1a1b1a1b",
      "log": [
        {
          "description": "running",
          "duration": 30,
          "date": "Mon Jan 01 2024"
        }
      ]
    }
    ```

-----

### Project Details

This project demonstrates a basic RESTful API implementation using Node.js and Express.js. Key features include:

  - **User Management**: Creating and listing users.
  - **Exercise Tracking**: Associating exercises with specific users.
  - **Data Filtering**: Retrieving exercise logs with `from`, `to`, and `limit` queries.
  - **CORS**: Enabled for cross-origin requests.

> **Note**: This implementation uses in-memory arrays for data storage. For a production environment, this should be replaced with a persistent database like MongoDB or PostgreSQL.