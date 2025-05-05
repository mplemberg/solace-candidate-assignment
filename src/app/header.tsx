import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      {/* Main Navigation */}
      <header className="bg-solace-green py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif text-white">
            <Image
              src="/solace.svg"
              alt="Solace Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </header>
    </>
  );
}
