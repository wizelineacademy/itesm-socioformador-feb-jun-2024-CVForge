import Image from "next/image";
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-100">
      <Navbar />
    </main>
  );
}
