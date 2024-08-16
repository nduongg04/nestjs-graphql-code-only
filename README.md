# NestJS GraphQL Project

This project is a NestJS application that uses GraphQL for API interactions. It includes features for managing authors and their posts.

## Table of Contents

-   [Description](#description)
-   [Installation](#installation)
-   [Usage](#usage)
-   [GraphQL Schema](#graphql-schema)
-   [Resolvers](#resolvers)
-   [Services](#services)
-   [Contributing](#contributing)
-   [License](#license)

## Description

This project demonstrates a basic setup of a NestJS application with GraphQL. It includes the following features:

-   CRUD operations for authors and posts.
-   Custom resolvers for complex queries and mutations.
-   Integration with a database for persistent storage.

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

#### Author

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

**Query: Get an author by id**

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

**Mutation: Create an author**
```graphql
mutation CreatePost($authorId: Int! = 1, $post: NewPostInput! =  {
    title: "Post title",
    votes: 0
  }) {
    createPost(authorId: $authorId, post: $post) {
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

**Mutation: Update an author**
```graphql
mutation UpdateAuthor($updateAuthorInput: UpdateAuthorInput! = {
    id: 1,
    firstName: "first name",
    lastName: "last name",
}) {
    updateAuthor(updateAuthorInput: $updateAuthorInput) {
        id
        firstName
        lastName
    }
}
```

**Mutation: Delete an author**
```graphql
mutation Mutation($authorId: Int! = 1) {
    deleteAuthor(id: $authorId) {
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

**Mutation: Create a post**

```graphql
mutation CreatePost($authorId: Int! = 1, $post: NewPostInput! = {
	title: "Post title",
	votes: 0
}) {
    createPost(authorId: $authorId, post: $post) {
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

#### Post
**Query: Get all posts**
```graphql
query Posts{
  posts {
    id
    title
    votes
  }
}
```

**Query: Get a post by id**
```graphql
query Post($postId: Int! = 1){
  post(id: $postId) {
    id
    title
    votes
  }
}
```

**Mutation: Update a post**
```graphql
mutation UpdatePost($updatePostInput: UpdatePostInput! = {
	id: 1,
	title: "Post title",
	votes: 1
}){
  updatePost(updatePostInput: $updatePostInput) {
    id
    title
    votes
  }
}
```

**Mutation: Delete an post**
```graphql
mutation DeletePost($postId: Int! = 1){
  deletePost(id: $postId) {
    id
    title
    votes
  }
}
```
## GraphQL Schema
The GraphQL schema is defined in `schema.gql`. Here are some key types and inputs: 
*Types*
```graphql
type Author {
  id: Int!
  name: String!
  posts: [Post!]!
}

type Post {
  id: Int!
  title: String!
  votes: Int!
}
```
*Inputs*
```graphql
input CreateAuthorInput {
  name: String!
}

input UpdatePostInput {
  id: Int!
  title: String
  votes: Int
}
```

## Resolvers
Resolvers are responsible for handling GraphQL queries and mutations. Here are some key resolvers:
### Authors Resolver
```typescript
@Resolver(of => Author)
export class AuthorsResolver {
  // ...other methods

  @Mutation(returns => AuthorWithPosts)
  async deleteAuthor(@Args('id', { type: () => Int }) id: number): Promise<AuthorWithPosts> {
    // Implementation
  }
}
```

### Posts Resolver
```typescript
@Resolver(of => Post)
export class PostsResolver {
  @Mutation(returns => Post)
  async updatePost(@Args('updatePostInput', { type: () => UpdatePostInput }) updatePostInput: UpdatePostInput) {
    // Implementation
  }

  @Mutation(returns => Post)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    // Implementation
  }
}
```

## Services
Services contain the business logic and interact with the database. Here are some key services:
### Authors Service
```typescript
@Injectable()
export class AuthorsService {
  // Methods for CRUD operations
}
```

### Posts Service
```typescript
@Injectable()
export class PostsService {
  // Methods for CRUD operations
}
```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
