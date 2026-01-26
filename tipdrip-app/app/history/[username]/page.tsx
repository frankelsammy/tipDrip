'use client'

import { Box, Container, Heading, Divider, Flex } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import TipHistoryTable from "@/components/TipHistory";

export default function HistoryPage() {
  return (
    <Box minH="100vh" bg="gray.50">
      <NavBar />
      
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
          <TipHistoryTable accountId="acct_1RwOgDLl1l7Vem7d" />
        </Flex>
      </Container>
    </Box>
  );
}