import 'dotenv/config';
import Joi from 'joi';

/**
 * Interface representing the expected environment variables.
 */
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
}

/**
 * Joi schema for validating environment variables.
 * Ensures required vars are present and allows other unknown variables.
 */
const envVarsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
}).unknown(true);

const { value, error } = envVarsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

/**
 * Exported configuration object containing validated environment variables.
 */
export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  corsOrigin: envVars.CORS_ORIGIN,
};
