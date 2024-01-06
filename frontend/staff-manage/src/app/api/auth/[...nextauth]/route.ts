import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apolloClient } from "src/components/ApolloProvider";
import { LOGIN_MUTATION } from "src/mutations";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        const client = new ApolloClient({
          uri: "http://localhost:9000",
          cache: new InMemoryCache(),
        });
        return client
          .mutate({
            mutation: LOGIN_MUTATION,
            variables: { email, password },
          })
          .then((result) => {
            if (result.data.login) {
              return result.data.login;
            } else {
              return null;
            }
          })
          .catch((error) => {
            return null;
          });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
