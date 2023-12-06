import Launches from "@/components/launches";
import SignOut from "@/components/sign-out";

export default function Home() {
  return (
    <div className="flex h-scree">
      <Launches />
      <SignOut />
    </div>
  );
}
