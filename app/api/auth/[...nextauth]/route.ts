import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin"
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
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID! as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET! as string,
      authorization: {
        url: 'https://www.linkedin.com/oauth/v2/authorization',
        params: { scope: 'openid profile email' }, // Specify the scope here
      },
      token: {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
      },
      userinfo: {
        url: 'https://api.linkedin.com/v2/userinfo',
        params: {
          projection: '', // Adjust according to your needs
        },
      },
      issuer: 'https://www.linkedin.com/oauth',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          givenName: profile.given_name,
          familyName: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
      allowDangerousEmailAccountLinking: true,
      /*
      client: { token_endpoint_auth_method: 'client_secret_post' },
      authorization: {
        url: 'https://www.linkedin.com/oauth/v2/authorization',
        params: { scope: 'openid profile email' },
      },
      */
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
  pages: {
    signIn: '/login',
  },
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