import clientPromise from '@/lib/mongodb';
import TipButtons from '@/components/TipButtons';
import CustomTipButton from '@/components/CustomTipButton';

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function TipPage({ params }: Props) {
  const { username } = await params;
  const client = await clientPromise;
  const db = client.db('tipdrip'); 
  const user = await db.collection('users').findOne({
    username: { $regex: `^${username}$`, $options: 'i' }
  });

  if (!user) return notFound();

  const tipOptions = user.tip_amounts || [user.tip1_amt, user.tip2_amt, user.tip3_amt, user.tip4_amt];
  const effectiveAccountId = user.stripeAccountId;

  const display_name = user.name.split(' ').length > 1 ? user.name.split(' ')[0] : user.name;

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
    >
      <Box
        w="100%"
        maxW="sm"
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
      >
        <Box
          bg="blue.600"
          color="white"
          borderTopRadius="2xl"
          p={4}
          fontWeight="bold"
          fontSize="lg"
        >
          TIPDRIP
        </Box>

        <Box p={6} textAlign="center">
          <Heading size="lg" mb={1}>
            Tip {display_name}
          </Heading>

          <Text mb={6} color="gray.600">
            Select an amount to tip.
          </Text>

          <TipButtons
            tipOptions={tipOptions}
            account_id={effectiveAccountId}
            username={user.username}
          />

          <Flex justify="center" my={4}>
            <CustomTipButton
              account_id={effectiveAccountId}
              username={user.username}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
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
