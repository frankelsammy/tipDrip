import clientPromise from '@/lib/mongodb';
import { notFound } from 'next/navigation';

import { Box, Container, Heading, Divider, Flex } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import TipHistoryTable from "@/components/TipHistoryTable";

type Props = {
  params: Promise<{ username: string }>;
};
export default async function HistoryPage({ params }: Props) {
  const { username } = await params;
  const client = await clientPromise;
  const db = client.db('tipdrip'); 
  const user = await db.collection('users').findOne({
    username: { $regex: `^${username}$`, $options: 'i' }
  });

  if (!user) return notFound();

  return (
    <Box minH="100vh" bg="gray.50">
      <NavBar username={username} />
      
      <Container maxW="container.lg" pt={10}>
        {/* Page Title */}
        <Heading 
          as="h1" 
          size="xl" 
          textAlign="center" 
          mb={6}
          color="gray.800"
        >
          Tip History
        </Heading>

        <Divider borderColor="gray.300" />

        {/* Table Container */}
        <Flex justify="center" align="start" mt={8}>
          <TipHistoryTable accountId={user.stripeAccountId} />
        </Flex>
      </Container>
    </Box>
  );
}