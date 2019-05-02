require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'matt123!',
      database: 'productqueuedev'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'matt123!',
      database: 'postgres_test'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
}
