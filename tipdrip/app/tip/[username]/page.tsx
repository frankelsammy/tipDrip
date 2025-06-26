import { users } from '@/lib/users';
import TipButtons from '@/components/tipButtons';
import CustomTipButton from '@/components/customTipButton';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function TipPage({ params }: Props) {
  const { username } = await params;
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return notFound();

  const tipOptions = [user.tip1_amt, user.tip2_amt, user.tip3_amt, user.tip4_amt];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white">
        <div className="bg-blue-800 text-white rounded-t-2xl p-4 font-bold text-lg">TIP DRIP</div>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-1">Tip {user.displayName}</h1>
          <p className="mb-6 text-gray-600">Select an amount to tip.</p>
          <TipButtons tipOptions={tipOptions} />
          <div className="flex justify-center my-4">
            <CustomTipButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return users.map((user) => ({
    username: user.username.toLowerCase(),
  }));
}
