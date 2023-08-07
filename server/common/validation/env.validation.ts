import Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PROJECT_NAME: Joi.string().required().description('The name of the project'),
  FRONTEND_URL: Joi.string()
    .required()
    .uri()
    .description(
      'The URL of the client application (frontend). This is used for CORS and the email confirmation link',
    ),
  PORT: Joi.number()
    .required()
    .default('3000')
    .port()
    .description('The port the server should listen on'),

  DATABASE_URL: Joi.string()
    .required()
    .default('file:./dev.db')
    .description('The URL of the database'),
});
