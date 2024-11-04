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
