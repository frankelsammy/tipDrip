import clientPromise from '@/lib/mongodb';

export default async function TestMongoPage() {
  const client = await clientPromise;
  const db = client.db('tipdrip'); // use lowercase

  // Fetch all users from the users collection
  const users = await db.collection('users').find({}).toArray();

  console.log('Users from MongoDB:', users);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">MongoDB Users</h1>
      <p>Check your server console for the users array.</p>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
}