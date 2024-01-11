import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useRef } from 'react'

export interface IAddBillSidebar {
    nameHasValue: Boolean
    amountHasValue: Boolean
    dueDateHasValue: Boolean
    frequencyHasValue: Boolean
    categoryHasValue: Boolean
    paymentMethodHasValue: Boolean
    paymentStatusHasValue: Boolean
    attachmentHasValue: Boolean
    notesHasValue: Boolean
}
export const AddBillsSidebar: React.FC<IAddBillSidebar> = ({
    nameHasValue,
    amountHasValue,
    dueDateHasValue,
    frequencyHasValue,
    categoryHasValue,
    paymentMethodHasValue,
    paymentStatusHasValue,
    attachmentHasValue,
    notesHasValue
}) => {

    return (
        <div className="flex flex-col w-72 space-y-5">
            <Button variant={nameHasValue ? "correct" : "default"}>Bill Name</Button>
            <Button variant={amountHasValue ? "correct" : "default"}>Amount</Button>
            <Button variant={dueDateHasValue ? "correct" : "default"}>Due Date</Button>
            <Button variant={frequencyHasValue ? "correct" : "default"}>Frequency</Button>
            <Button variant={categoryHasValue ? "correct" : "default"}>Category</Button>
            <Button variant={paymentStatusHasValue ? "correct" : "default"}>Payment Status</Button>
            <Button variant={paymentMethodHasValue ? "correct" : "default"}>Payment Method</Button>
            <Button variant={attachmentHasValue ? "correct" : "default"}>Notes</Button>
            <Button variant={notesHasValue ? "correct" : "default"}>Attachments</Button>
        </div>
    );
}