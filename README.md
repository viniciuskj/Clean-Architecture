# Contacts API

A RESTful API for managing contacts built with TypeScript, Express, and MongoDB, following clean architecture principles.

## Architecture Overview

This project implements a clean architecture pattern with the following layers:

- **Domain Layer**: Contains the business logic and rules of the application.
- **Data Layer**: Handles the data access and storage implementation.
- **Presentation Layer**: Manages the HTTP requests and responses.

### Key Components

- **Entities**: Define the core business objects (e.g., Contact).
- **Use Cases**: Implement the business logic and application-specific rules.
- **Repositories**: Interface the domain layer with data sources.
- **Data Sources**: Provide access to external data systems (MongoDB).
- **Routers**: Handle HTTP requests and direct them to the appropriate use cases.

## Project Structure

```
src/
├── data/
│   ├── data-sources/
│   │   └── mongodb/
│   │       ├── models/
│   │       └── mongodb-contact-data-source.ts
│   └── interfaces/
│       └── data-sources/
│           ├── contact-data-source.ts
│           └── database-wrapper.ts
├── domain/
│   ├── entities/
│   │   └── contact.ts
│   ├── interfaces/
│   │   ├── repositories/
│   │   │   └── contact-repository.ts
│   │   └── use-cases/
│   │       └── contact/
│   │           ├── create-contact.ts
│   │           └── get-all-contacts.ts
│   ├── repositories/
│   │   └── contact-repository.ts
│   └── use-cases/
│       └── contact/
│           ├── create-contact.ts
│           └── get-all-contacts.ts
├── presentation/
│   └── routers/
│       └── contact-router.ts
├── main.ts
└── server.ts
```

## Technologies Used

- **TypeScript**: For type-safe code
- **Express.js**: Web framework
- **MongoDB**: Database
- **Jest**: Testing framework
- **Supertest**: HTTP testing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB instance running on localhost:27017

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Build the TypeScript code:
   ```
   npm run dev:build
   ```

2. Start the server:
   ```
   npm run dev:serve
   ```

The server will be running on port 4000.

### Running Tests

```
npm test
```

## API Endpoints

### GET /contact
Retrieves all contacts.

**Response**:
```json
[
  {
    "id": "1",
    "surname": "Smith",
    "firstName": "John",
    "email": "john@gmail.com"
  }
]
```

### POST /contact
Creates a new contact.

**Request Body**:
```json
{
  "surname": "Smith",
  "firstName": "John",
  "email": "john@gmail.com"
}
```

**Response**:
```json
{
  "message": "Created"
}
```

## Development Notes

The implementation is currently missing the `getContacts()` method in the `ContactRepositoryImpl` class.
