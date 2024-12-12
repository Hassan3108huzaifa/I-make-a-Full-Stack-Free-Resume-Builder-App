// src/types/next-auth.d.ts

import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string
      provider?: string  // Add provider here
    } & DefaultSession['user'] // Preserve all other properties of the default user object
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    /** The user's unique identifier */
    id: string
    provider?: string  // Add provider here, as we are using it in the session and JWT
  }
}

// Extend the JWT type to include the user id and provider
declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's unique identifier */
    id?: string
    provider?: string  // Add provider here to reflect the session callback
  }
}
