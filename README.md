# NestJS GraphQL Project

This project is a NestJS application that uses GraphQL for API interactions. It includes features for managing authors and their posts.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
- [Resolvers](#resolvers)
- [Services](#services)
- [Contributing](#contributing)
- [License](#license)

## Description

This project demonstrates a basic setup of a NestJS application with GraphQL. It includes the following features:
- CRUD operations for authors and posts.
- Custom resolvers for complex queries and mutations.
- Integration with a database for persistent storage.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/nduongg04/nestjs-graphql-code-only.git
    cd nestjs-graphql-code-only
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up the database:**
    - Ensure you have a running instance of your database (e.g., PostgreSQL, MySQL).
    - Update the database URL in `.env` file.
	```env
	DATABASE_URL="your-postgresql-url"
	```

4. **Run the application:**
    ```bash
    npm run start
    ```

## Usage

Once the application is running, you can access the GraphQL playground at `http://localhost:3000/graphql` to interact with the API.

### Example Queries and Mutations

#### Author:

**Query: Get all authors**
```graphql
query {
  authors {
    id
    name
    posts {
      id
      title
    }
  }
}
```

**Query: Get author by id**
```graphql
query ($authorId: Int!) {
  author(id: $authorId) {
    id
    firstName
    lastName
    posts {
      id
      title
      votes
    }
  }
} 
```


