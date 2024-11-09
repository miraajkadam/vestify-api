export const NODE_ENV = process.env.NODE_ENV as string

export const JWT_SECRET = process.env.JWT_SECRET as string

export const DATABASE_URL = process.env.DATABASE_URL as string

const envPORT = (process.env.PORT as string) || 3000
/**
 * The port on which the application will run.
 *
 * This value is derived from the environment variable `PORT`. If `PORT` is not specified in the
 * environment, it defaults to 3000.
 *
 * @constant {number} PORT - The port number for the application.
 */
export const PORT = +envPORT

const envAccessControlAllowedOrigins = process.env.ACCESS_CONTROL_ALLOW_ORIGINS as string
/**
 * The list of allowed origins for cross-origin requests (CORS).
 *
 * This value is fetched from the environment variable `ACCESS_CONTROL_ALLOW_ORIGINS`.
 * If the environment variable is set, it is expected to be a semicolon-separated
 * list of allowed origins. If the environment variable is not set, the default
 * value of '*' is used, which allows all origins.
 *
 * @constant {string|string[]} ACCESS_CONTROL_ALLOW_ORIGINS - A list of allowed
 * origins, either as a string array or a wildcard '*' if no environment variable
 * is provided.
 */
export const ACCESS_CONTROL_ALLOW_ORIGINS = envAccessControlAllowedOrigins
  ? envAccessControlAllowedOrigins.split(';')
  : '*'
