import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Select, Button, Radio, RadioGroup, Stack, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTransactionModal from "../components/EditTransactionModal";
import ConfirmationDialog from "../components/ConfirmationDialog";

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

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    onEditOpen();
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    onDeleteOpen();
  };

  const handleEditTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction));
    setTransactions(updatedTransactions);
    onEditClose();
  };

  const handleDeleteTransaction = () => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== selectedTransaction.id);
    setTransactions(updatedTransactions);
    onDeleteClose();
  };

  return (
    <Box p={4}>
      {}
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
                <Th>Actions</Th>
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
                  <Td>
                    <IconButton icon={<FaEdit />} aria-label="Edit" onClick={() => handleEditClick(transaction)} mr={2} />
                    <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDeleteClick(transaction)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <EditTransactionModal isOpen={isEditOpen} onClose={onEditClose} transaction={selectedTransaction} onSave={handleEditTransaction} />

      <ConfirmationDialog isOpen={isDeleteOpen} onClose={onDeleteClose} onConfirm={handleDeleteTransaction} title="Delete Transaction" message="Are you sure you want to delete this transaction?" />
    </Box>
  );
};

export default Index;
