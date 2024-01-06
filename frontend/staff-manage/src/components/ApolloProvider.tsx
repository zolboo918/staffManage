"use client";
import {
  ApolloProvider as ApProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:9000",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApProvider client={apolloClient}>{children}</ApProvider>;
}
