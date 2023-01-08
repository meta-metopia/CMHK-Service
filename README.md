![metopia](/images//logo.png)

# Metopia CMHK Data Service

This is a data service for Metopia CMHK. It is a RESTful API that provides data for the Metopia CMHK app. Check out the [API documentation](https://cmhk.metopia.co/api) for more information.


# Local Development

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Pnpm](https://pnpm.js.org/)

## Setup

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL
RPC_URL=
CONTRACT_ADDRESS=
```

4. Run `pnpm start:dev` to start the server


