export const config = {
  SECRET_KEY:
    process.env.EXEAT_SECRET_KEY || '1gq684gfqsd5f4gqsdfsqdf4qse4éq6se54fqsgr',
  TOKEN_EXPIRATION: process.env.EXEAT_TOKEN_EXPIRATION || 10800,
  BASE_URL: process.env.EXEAT_BASE_URL || 'http://localhost:8080',
  APP_ENV: process.env.APP_ENV || 'PREPROD',
  DB_HOST: process.env.DB_HOST || 'localhost',
  APP_PORT: process.env.APP_PORT || '8212',
  APP_NAME: process.env.APP_NAME || 'restaurantService',
  APP_HOST: process.env.APP_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT || '64000',
  DB_NAME: process.env.DB_NAME || 'exeat',
  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  GEOCODING_API_KEY: process.env.GEOCODING_API_KEY || '',
};
