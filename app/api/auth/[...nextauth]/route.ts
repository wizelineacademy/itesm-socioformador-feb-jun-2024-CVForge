import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.users.findFirst({ where: { email: credentials.email.toLowerCase() } });

        if (user) {
          // If the user is found, compare the provided password with the hashed password in the database
          //const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          const passwordMatch = credentials.password == user.password;

          if (passwordMatch) {
            // If the passwords match, return the user object
            return {
              id: user.users_id.toString(),
              email: user.email,
            };
          }
        }

        return null;
      },
    }),
    /*
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    */
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      // Check if the user exists in the "users" table
      const existingUser = await prisma.users.findFirst({
        where: { email: user.email ?? "" },
      });

      // If the user does not exist, create a new entry
      if (!existingUser) {
        await prisma.users.create({
          data: {
            email: user.email ?? "",
            password: "123",
          },
        });
      }

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      // Add any other custom claims here
      return token;
    },
    async session({ session, token, user }) {
      // You can also customize the session object here
      return session;
    },
 },
})

export { handler as GET, handler as POST }