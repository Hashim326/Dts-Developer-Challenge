# Task Manager

A full-stack task management application where users can register, log in, and manage their personal tasks. Built with **.NET Core**, **Entity Framework (EF Core)**, **SQLite**, and **Angular**.

## Table of Contents
- [About](#about)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Backend](#backend)
- [Frontend](#frontend)
- [API Endpoints](#api-endpoints)

## About

**TaskManager** allows users to create an account, log in securely with JWT authentication, and perform full CRUD operations (Create, Read, Update, Delete) on their personal tasks.

The backend provides a RESTful API, while the Angular frontend offers a responsive and user-friendly interface.

## Tech Stack

- **Backend**:  
  - .NET Core Web API  
  - Entity Framework Core (EF Core)  
  - SQLite (Database)  
  - JWT Authentication

- **Frontend**:  
  - Angular  
  - TypeScript  
  - SCSS/CSS  

## Features

- User registration and login with JWT authentication
- Create, view, edit, and delete personal tasks
- Responsive and simple user interface
- Secure password hashing
- Token-based protected routes
- Full CRUD RESTful API
- Error handling and user-friendly feedback

## Setup Instructions

### Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js and npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### Backend

1. Navigate to the backend project directory:
    ```bash
    cd DtsApi
    ```

2. Restore .NET dependencies:
    ```bash
    dotnet restore
    ```

3. Apply database migrations:
    ```bash
    dotnet run --launch-profile https
    ```

> Backend will run at `https://localhost:7101`.

### Frontend

1. Navigate to the frontend Angular project directory:
    ```bash
    cd Frontend/TaskManagerFrontend
    ```

2. Install Angular project dependencies:
    ```bash
    npm install
    ```

3. Start the Angular development server:
    ```bash
    npm start -- --port 4200
    ```

> Frontend will run at `http://localhost:4200`.

### API Endpoints
The api endpoint documentation can be found at `https://localhost:7101/swagger/index.html` whilst the API is running
