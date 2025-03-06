
## Task Management 
A task management application that allows users to create, view, update, and delete tasks. This application is designed to help users organize and track their daily tasks efficiently.

## Features
User Authentication: Secure registration and login for each user.

Task Management:
  Create new tasks with a title, description, status, and due date.
  View a list of tasks.
  Calendar view of tasks
  Update task details.
  Delete tasks.

## Technologies Used
  Frontend: SvelteKit with Tailwind CSS for styling.
  Backend: Node.js with Nest.js for handling RESTful APIs.
  Database: PostgreSQL for storing user and task data.
  Authentication: JSON Web Tokens (JWT) for securing API routes.

## Roadmap
  
  Allow user to collaborate and share Task and Kanban

## Installation
  1. Clone the repository:

```
    git clone https://github.com/dianelz/TaskManagement.git
    cd TaskManagement
```

  2. Install backend dependencies:
 ```
  cd backend
  npm install
```
  3. Set up environment variables:
  
  Create a .env file in the backend directory and configure the following:
  ```
  PORT=5000
  DATABASE_URL=postgres://your_user:your_password@localhost:5432/your_database
  JWT_SECRET=your_jwt_secret
```
  Make sure you have PostgreSQL installed and running.
  
  4. Run database migrations:
```
  npx prisma migrate dev --name init
```

  5. Start the backend server:
```
  npm run dev
```
  6. Install frontend dependencies:
```
  cd ../frontend
  npm install
```
  7. Start the SvelteKit application:
 ```
  npm run dev
```
  Usage
  Open http://localhost:5173 in your browser.
  Sign up or log in to manage your tasks.
  Use the interface to add, update, or delete tasks as needed.
  
## Contribution
  Contributions are welcome! If you would like to improve this project, follow these steps:

## Fork the repository.
  Create a new branch (git checkout -b feature/my-feature).
  Commit your changes (git commit -m 'Add my feature').
  Push to the branch (git push origin feature/my-feature).
  Open a Pull Request.

## License
  This project is licensed under the MIT License. 
