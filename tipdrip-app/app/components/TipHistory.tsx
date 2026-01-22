'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const title = "Basic Table";
type TipRecord = {
  _id: string;
  username: string;
  account_id: string;
  amount: number;
  date: string;
  sessionId: string;
};
const convertToCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

const getDateString = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
}

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
        console.log('Fetched tip history:', data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [accountId]);
  return (
  <div className="w-full max-w-4xl rounded-md border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((record) => (
          <TableRow key={record._id}>
            <TableCell>{getDateString(record.date)}</TableCell>
            <TableCell className="font-medium">{convertToCurrency(record.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
}

