import { getServerSession } from "next-auth";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "semantic-ui-css/semantic.min.css";
import ApolloProvider from "src/components/ApolloProvider";
import AuthProvider from "src/components/AuthProvider";
import LogOutButton from "src/components/LogOutButton";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Staff manage",
  description: "staff manage",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <ApolloProvider>
          <body className={inter.className}>
            <main className="flex h-full w-full bg-gray-400 justify-center align-middle">
              <LogOutButton />
              {children}
            </main>
          </body>
        </ApolloProvider>
      </AuthProvider>
    </html>
  );
}
