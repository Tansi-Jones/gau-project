import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const hours = new Date().getHours();

  if (!session?.user?.id) return redirect("/auth/login");
  return (
    <>
      <Navbar />

      <header className="relative w-full h-32">
        <div className="w-full h-full bg-primary/50">
          <Image
            src="/assets/background.jpg"
            alt="background"
            fill
            className="object-cover -z-10"
          />
        </div>

        <div className="z-10 absolute top-10 w-full">
          <h1 className="uppercase text-center text-2xl font-bold text-white">
            {hours >= 0 && hours < 12
              ? " Good morning 👋"
              : hours >= 12 && hours < 17
              ? "Good afternoon 👋"
              : "Good evening 👋"}
          </h1>
        </div>
      </header>
      {children}
    </>
  );
}
