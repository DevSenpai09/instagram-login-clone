import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr_auto]">
      {/* Logo */}
      <div className="grid place-content-center animate-pulse">
        <div className="w-20 relative">
          <Image
            src="/instagram-logo.png"
            width={1000}
            height={1000}
            alt="From Meta"
          />
        </div>
      </div>

      {/* From Meta */}
      <div className="w-max mx-auto py-10">
        <div className="w-20 relative">
          <Image
            src="/from-meta.png"
            width={1000}
            height={1000}
            alt="From Meta"
          />
        </div>
      </div>
    </div>
  );
}
