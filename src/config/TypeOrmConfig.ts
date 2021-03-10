import { ConnectionOptions } from 'typeorm'
import { resolve } from 'path'
import CustomDatabaseNamingStrategy from './CustomDatabaseNamingStrategy'

export default {
  type: process.env.DB_TYPE,
  url: process.env.DATABASE_URL,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_LOGGING || process.env.NODE_ENV == 'development',
  entities: [resolve(__dirname, '../', 'models', '*.{js,ts}')],
  migrations: [resolve(__dirname, '../', 'database', 'migrations', '*.{js,ts}')],
  cli: {
    entitiesDir: resolve(__dirname, '../', 'models'),
    migrationsDir: resolve(__dirname, '../', 'database', 'migrations'),
  },
  extra: process.env.NODE_ENV == 'production' ? {
    ssl: {
      rejectUnauthorized: false,
    },
  } : {},
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  synchronize: false,
  migrationsTransactionMode: 'all',
  namingStrategy: new CustomDatabaseNamingStrategy(),
} as ConnectionOptions
