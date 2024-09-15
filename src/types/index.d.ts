import * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface JwtPayload extends jwt.JwtPayload {
    user: {
      id: string
    }
  }
}

// declare global {
//   namespace Express {
//     interface User {
//       id: string
//     }
//   }
// }

export {}
