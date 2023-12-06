import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div>
      {session && (
        <p className="text-white text-sm font-bold">
          Welcome {session.user?.name || "user"}!
        </p>
      )}
    </div>
  );
}
