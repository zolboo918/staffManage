import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/users");
  } else {
    redirect("/signin");
  }
  return <main className="flex text-black">home</main>;
}
