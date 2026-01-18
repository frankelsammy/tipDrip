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
const users = [
  {
    name: "John Flow",
    email: "john@example.com",
    location: "New York",
    status: "Active",
    balance: "$1,234.56",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    location: "London",
    status: "Active",
    balance: "$2,345.67",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    location: "Tokyo",
    status: "Inactive",
    balance: "$567.89",
  },
  {
    name: "Alice Williams",
    email: "alice@example.com",
    location: "Paris",
    status: "Active",
    balance: "$3,456.78",
  },
];

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
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((record) => (
          <TableRow key={record._id}>
            <TableCell className="font-medium">{record.amount}</TableCell>
            <TableCell>{record.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
}

