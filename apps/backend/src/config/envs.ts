import 'dotenv/config';
import Joi from 'joi';

/**
 * Interface representing the expected environment variables.
 */
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

/**
 * Joi schema for validating environment variables.
 * Ensures required vars are present and allows other unknown variables.
 */
const envVarsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
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
};
