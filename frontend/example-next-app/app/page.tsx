import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-16">
          <h1 className="text-4xl text-center underline">The Best Example NextJS Application!</h1>

          <nav>
            <ul className="flex gap-4">
              <li><Link className="block px-8 py-4 font-bold transition-all rounded-lg shadow bg-slate-300 hover:scale-105 hover:shadow-md shadow-black" href="/upload">Upload a File!</Link></li>
              <li><Link className="block px-8 py-4 font-bold transition-all rounded-lg shadow bg-slate-300 hover:scale-105 hover:shadow-md shadow-black" href="/files">Browse Files!</Link></li>
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
