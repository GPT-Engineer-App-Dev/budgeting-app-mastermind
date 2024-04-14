import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Select, Button, Radio, RadioGroup, Stack, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

const Index = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2023-05-01",
      amount: 100,
      type: "income",
      category: "Salary",
      description: "Monthly salary",
    },
    {
      id: 2,
      date: "2023-05-05",
      amount: 50,
      type: "expense",
      category: "Groceries",
      description: "Weekly groceries",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "income",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...formData,
      id: transactions.length + 1,
      amount: parseFloat(formData.amount),
    };
    setTransactions([...transactions, newTransaction]);
    setFormData({
      date: "",
      amount: "",
      type: "income",
      category: "",
      description: "",
    });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        Budget App
      </Heading>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Add Transaction
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <RadioGroup name="type" value={formData.type} onChange={(value) => setFormData({ ...formData, type: value })}>
              <Stack direction="row">
                <Radio value="income">Income</Radio>
                <Radio value="expense">Expense</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select category</option>
              <option value="Groceries">Groceries</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add Transaction
          </Button>
        </form>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Transactions
        </Heading>
        <TableContainer>
          <Table variant="simple" size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Type</Th>
                <Th>Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.description}</Td>
                  <Td isNumeric>{transaction.amount}</Td>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.category}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Index;
