import clientPromise from '@/lib/mongodb';
import TipButtons from '@/components/tipButtons';
import CustomTipButton from '@/components/customTipButton';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function TipPage({ params }: Props) {
  const { username } = await params;
  const client = await clientPromise;
  const db = client.db('tipdrip'); // use your actual db name
  const user = await db.collection('users').findOne({
    username: { $regex: `^${username}$`, $options: 'i' }
  });

  if (!user) return notFound();

  // Adjust property names if needed to match your MongoDB document
  const tipOptions = user.tip_amounts || [user.tip1_amt, user.tip2_amt, user.tip3_amt, user.tip4_amt];
  const effectiveAccountId = user.account_id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white">
        <div className="bg-blue-800 text-white rounded-t-2xl p-4 font-bold text-lg">TIPDRIP</div>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-1">Tip {user.display_name}</h1>
          <p className="mb-6 text-gray-600">Select an amount to tip.</p>
          <TipButtons tipOptions={tipOptions} account_id={effectiveAccountId} username={user.username} />
          <div className="flex justify-center my-4">
            <CustomTipButton account_id={effectiveAccountId} username={user.username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db('tipdrip');
  const users = await db.collection('users').find({}).toArray();
  return users.map((user: any) => ({
    username: user.username.toLowerCase(),
  }));
}
