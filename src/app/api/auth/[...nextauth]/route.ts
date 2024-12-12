import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(process.env.MONGODB_URI!);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password')
        }
        const mongoClient = await clientPromise;
        const db = mongoClient.db('resumeforge');
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('No user found with this email')
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.image,
        };
      }
    })
  ],
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const mongoClient = await clientPromise;
          const db = mongoClient.db('resumeforge');
          const usersCollection = db.collection('users');

          const existingUser = await usersCollection.findOne({ email: user.email });

          if (existingUser) {
            await usersCollection.updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  image: user.image,
                  lastSignIn: new Date(),
                },
              }
            );
          } else {
            await usersCollection.insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              createdAt: new Date(),
              lastSignIn: new Date(),
            });
          }
        } catch (error) {
          console.error('Error saving user to MongoDB:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };