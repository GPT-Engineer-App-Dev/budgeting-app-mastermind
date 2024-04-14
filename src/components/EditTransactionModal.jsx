import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, RadioGroup, Radio, Stack } from "@chakra-ui/react";

const EditTransactionModal = ({ isOpen, onClose, transaction, onSave }) => {
  const [formData, setFormData] = useState(transaction);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalBody>
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
            <Button type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditTransactionModal;
