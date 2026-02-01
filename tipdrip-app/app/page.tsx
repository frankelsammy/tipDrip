import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main style={{ padding: '20px' }}>
      {session ? (
        <div>
          <h1>Logged in as {session.user?.name}</h1>
          <p>Email: {session.user?.email}</p>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </main>
  );
}