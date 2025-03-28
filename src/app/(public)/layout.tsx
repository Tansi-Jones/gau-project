import { Hero } from "@/components/Hero";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Hero />
      {children}
    </>
  );
}
