import { Toaster } from "@/components/ui/toaster";
import React, { useState } from "react";
import { AddBillsForm } from "./AddBillsForm";
import { AddBillsSidebar } from "./AddBillsSidebar";

export const AddBills: React.FC = ({}) => {
  const [nameHasValue, setNameHasValue] = useState(false);
  const [amountHasValue, setAmountHasValue] = useState(false);
  const [dueDateHasValue, setDueDateHasValue] = useState(false);
  const [frequencyHasValue, setFrequencyHasValue] = useState(false);
  const [categoryHasValue, setCategoryHasValue] = useState(false);
  const [paymentMethodHasValue, setPaymentMethodHasValue] = useState(false);
  const [paymentStatusHasValue, setPaymentStatusHasValue] = useState(false);
  const [attachmentHasValue, setAttachmentHasValue] = useState(false);
  const [notesHasValue, setNotesHasValue] = useState(false);
  const handleNameChange = (value: string) => {
    setNameHasValue(value.length > 0);
  };
  const handleAmountChange = (value: string) => {
    setAmountHasValue(value.length > 0);
  };
  const handleDueDateChange = (value: string) => {
    setDueDateHasValue(value.length > 0);
  };
  const handleFrequencyChange = (value: string) => {
    setFrequencyHasValue(value.length > 0);
  };
  const handleCategoryChange = (value: string) => {
    setCategoryHasValue(value.length > 0);
  };
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethodHasValue(value.length > 0);
  };
  const handlePaymentStatusChange = (value: string) => {
    setPaymentStatusHasValue(value.length > 0);
  };
  const handleAttachmentChange = (value: string) => {
    setAttachmentHasValue(value.length > 0);
  };
  const handleNotesChange = (value: string) => {
    setNotesHasValue(value.length > 0);
  };
  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-1 flex-row pb-2">
        <div className="flex flex-col">
          <div className="flex font-mono text-2xl font-bold text-primary">
            Add Bills
          </div>
          <div className="flex font-serif text-sm text-muted-foreground  ">
            Add Your Bills here, specifying all the necessary details such as
            Bill Name/Description, Amount Due, Payment Status Etc
          </div>
        </div>
      </div>
      <hr />
      <div className="flex space-x-10 pt-8">
        <AddBillsSidebar
          nameHasValue={nameHasValue}
          amountHasValue={amountHasValue}
          dueDateHasValue={dueDateHasValue}
          frequencyHasValue={frequencyHasValue}
          categoryHasValue={categoryHasValue}
          paymentMethodHasValue={paymentMethodHasValue}
          paymentStatusHasValue={paymentStatusHasValue}
          attachmentHasValue={attachmentHasValue}
          notesHasValue={notesHasValue}
        />
        <AddBillsForm
          handleAmountChange={handleAmountChange}
          handleAttachmentChange={handleAttachmentChange}
          handleCategoryChange={handleCategoryChange}
          handleNameChange={handleNameChange}
          handleNotesChange={handleNotesChange}
          handleDueDateChange={handleDueDateChange}
          handleFrequencyChange={handleFrequencyChange}
          handlePaymentMethodChange={handlePaymentMethodChange}
          handlePaymentStatusChange={handlePaymentStatusChange}
        />
        <Toaster />
      </div>
    </div>
  );
};
