import Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PROJECT_NAME: Joi.string()
    .default('KaraokeList')
    .description('The name of the project'),
  PORT_FRONTEND: Joi.number()
    .port()
    .default(3000)
    .description('The port of the client application (frontend) should run on'),
  PORT_BACKEND: Joi.number()
    .port()
    .default(3001)
    .description('The port of the server application (backend) should run on'),
  URL_FRONTEND: Joi.string()
    .uri()
    .default('http://localhost:3000')
    .description(
      'The URL of the client application (frontend). Used for CORS, cookies, and links.',
    ),
  URL_BACKEND_ENDPOINT: Joi.string()
    .uri()
    .default('http://localhost:3001/graphql')
    .description(
      'The full URL of the server application (backend) graphql endpoint. Used for Apollo client in client application.',
    ),
  DEFAULT_LANGUAGE: Joi.string()
    .valid('en-US', 'de-DE')
    .default('en-US')
    .description('The default language of the application'),
  TABLE_PAGE_SIZE: Joi.number()
    .default(100)
    .description('The default page size for tables'),

  DATABASE_URL: Joi.string()
    .default('file:./dev.db')
    .description('The URL of the database'),
  JWT_SECRET: Joi.string()
    .required()
    .description('Long secret string for JWT (authentication)'),
  JWT_EXPIRATION_TIME: Joi.string()
    .default('7d')
    .description('The expiration time for JWT'),

  MUSIC_API_TYPE: Joi.string()
    .valid('SPOTIFY')
    .default('SPOTIFY')
    .description('The API to use for music data. (SPOTIFY = Spotify API)'),
  MUSIC_API_TIMEOUT_IN_MS: Joi.number()
    .default('10000')
    .description('The timeout for music api requests in milliseconds'),
  SPOTIFY_CLIENT_ID: Joi.string()
    .required()
    .description('The client ID of the Spotify app'),
  SPOTIFY_CLIENT_SECRET: Joi.string()
    .required()
    .description('The client secret of the Spotify app'),
});
