import Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PROJECT_NAME: Joi.string()
    .default('KaraokeList')
    .description('The name of the project'),
  FRONTEND_URL: Joi.string()
    .uri()
    .default('${PROTOCOL}://${HOST}:${PORT}/')
    .description(
      'The URL of the client application (frontend). This is used for CORS and the email confirmation link',
    ),
  PROTOCOL: Joi.string()
    .default('http')
    .description('The protocol of the frontend URL (http or https)'),
  HOST: Joi.string()
    .hostname()
    .default('localhost')
    .description('The host the server should listen on'),
  PORT: Joi.number()
    .default('3000')
    .port()
    .description('The port the server should listen on'),
  DATABASE_URL: Joi.string()
    .default('file:./dev.db')
    .description('The URL of the database'),
  JWT_SECRET: Joi.string()
    .required()
    .description('Long secret string for JWT (authentication)'),
  JWT_EXPIRATION_TIME: Joi.string()
    .default('7d')
    .description('The expiration time for JWT'),
  SPOTIFY_CLIENT_ID: Joi.string()
    .required()
    .description('The client ID of the Spotify app'),
  SPOTIFY_CLIENT_SECRET: Joi.string()
    .required()
    .description('The client secret of the Spotify app'),
  SPOTIFY_TIMEOUT_IN_MS: Joi.number()
    .default('10000')
    .description('The timeout for Spotify requests in milliseconds'),
});
