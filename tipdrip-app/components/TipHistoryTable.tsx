'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

type TipRecord = {
  _id: string;
  username: string;
  account_id: string;
  amount: number;
  date: string;
  sessionId: string;
};

const convertToCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const getDateString = (dateStr: string) =>{
  console.log("DateStr:", dateStr);
   return new Date(dateStr).toLocaleDateString();}

export default function TipHistoryTable({ accountId }: { accountId: string }) {
  const [history, setHistory] = useState<TipRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accountId) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/tip-history?accountId=${accountId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [accountId]);

  if (loading) {
    return (
      <Stack w="full" maxW="4xl" spacing={3}>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  if (history.length === 0) {
    return (
      <Box w="full" maxW="4xl" p={8} textAlign="center" borderWidth="1px" borderRadius="md">
        <Text color="gray.500">No tip history found.</Text>
      </Box>
    );
  }

  return (
    <TableContainer 
      w="full" 
      maxW="4xl" 
      borderWidth="1px" 
      borderRadius="lg" 
      bg="white"
    >
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th>Date</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.map((record) => (
            <Tr key={record._id}>
              <Td>{getDateString(record.date)}</Td>
              <Td isNumeric fontWeight="medium" color="blue.700">
                {convertToCurrency(record.amount)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}