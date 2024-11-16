import { 
  CheckIcon, 
  PencilIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  useCloseSupportTicket, 
  useAssignSupportTicket 
} from '@/hooks/useSupportTickets';
import React from 'react';
import Swal from 'sweetalert2';
import Tippy from '@tippyjs/react';
import { cn } from '@/utilities/helpers';
import type { SupportTicket } from '@/types/SupportTicketTypes';
import { showConfirmationAlert, toast } from '@/components/ui/SweetAlert';

interface TicketRowProps {
  ticket: SupportTicket;
  onEdit: () => void;
}

const TicketRow: React.FC<TicketRowProps> = ({ ticket, onEdit }) => {
  const closeTicket = useCloseSupportTicket();
  const assignTicket = useAssignSupportTicket();

  const handleCloseTicket = async () => {
    showConfirmationAlert({
      title: 'Are you sure?',
      text: 'Are you sure you want to close this ticket?',
      icon: 'warning',
      confirmButtonText: 'Yes, close it!',
      cancelButtonText: 'Cancel',
      onConfirm: async () => {
        try {
          await closeTicket.mutateAsync(ticket.id);
          toast('Ticket closed successfully', { icon: 'success' });
        } catch (error) {
          console.error('Error closing ticket:', error);
          toast((error as Error).message, { icon: 'error' });
        }
      }
    });
  };

  const handleAssignTicket = async () => {
    showConfirmationAlert({
      title: 'Assign Ticket',
      text: 'Enter the ID of the agent to assign this ticket to:',
      input: 'text',
      inputPlaceholder: 'Agent ID',
      confirmButtonText: 'Assign',
      cancelButtonText: 'Cancel',
      preConfirm: (assignedTo) => {
        if (!assignedTo) {
          Swal.showValidationMessage('Please enter an agent ID');
        }
        return assignedTo;
      },
      onConfirm: async (assignedTo) => {
        try {
          if (assignedTo) {
            await assignTicket.mutateAsync({ id: ticket.id, assignedTo });
            toast('Ticket assigned successfully', { icon: 'success' });
          }
        } catch (error) {
          console.error('Error assigning ticket:', error);
          toast((error as Error).message, { icon: 'error' });
        }
      }
    });
  };

  return (
    <tr>
      <td>
        <div className="whitespace-nowrap">{ticket.ticketNumber}</div>
      </td>
      <td>
        <div className="font-medium text-gray-900 dark:text-white">{ticket.subject}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{ticket.description}</div>
      </td>
      <td>
        <span
          className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', {
            'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400': ticket.status === 'open',
            'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400': ticket.status === 'resolved',
            'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400': ticket.status === 'closed',
          })}
        >
          {ticket.status}
        </span>
      </td>
      <td>
        <span
          className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', {
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400': ticket.priority === 'medium',
            'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400': ticket.priority === 'high',
            'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400': ticket.priority === 'low',
          })}
        >
          {ticket.priority}
        </span>
      </td>
      <td>
        {ticket.assignedTo ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
            {ticket.assignedTo}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">Unassigned</span>
        )}
      </td>
      <td className="text-center">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Tippy content="Edit">
              <button type="button" onClick={onEdit}>
                <PencilIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          {ticket.status === 'open' && (
          <>
          <li>
            <Tippy content="Edit">
              <button type="button" onClick={handleAssignTicket}>
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="Delete">
              <button type="button" onClick={handleCloseTicket}>
                <XCircleIcon className="w-5 h-5 text-danger" />
              </button>
            </Tippy>
          </li>
          </>
          )}
        </ul>
      </td>
    </tr>
  );
};

export default TicketRow;
