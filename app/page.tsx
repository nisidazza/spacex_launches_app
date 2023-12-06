import Link from "next/link";
import backgroundImage from "../public/space_x.png";

export default function Home() {
  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-100 font-bold text-8xl">SpaceX</h1>
          <p className="text-stone-100 mt-5 font-bold text-2xl">
            Get all sorts of information about previous Space X launches!
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/protected"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="text-stone-100 hover:text-stone-300 transition-all text-2xl"
          >
            Members
          </Link>
        </div>
      </div>
    </div>
  );
}
