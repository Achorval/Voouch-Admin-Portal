// src/pages/histories/TransactionRow.tsx
import { 
  XCircleIcon, 
  PencilSquareIcon, 
  WrenchScrewdriverIcon, 
} from '@heroicons/react/24/solid';
import { 
  TransactionWithUser, 
  TransactionActionType 
} from '@/types/TransactionTypes';
import React from 'react';
import { format } from 'date-fns';
import Tippy from '@tippyjs/react';
import { cn } from '@/utilities/helpers';

interface TransactionRowProps {
  transaction: TransactionWithUser;
  onEdit: () => void;
  handleTransactionAction: (id: string, action: TransactionActionType) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, handleTransactionAction }) => {
  return (
    <tr>
      <td>  
        <div>
          {transaction.user.firstName} {transaction.user.lastName}
        </div>
        <div className="text-gray-500 dark:text-gray-400">{transaction.user.email}</div>
      </td>
      <td>{transaction.category.name}</td>
      <td>
        {transaction.amount.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
      <td>
        {transaction.fee.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
      <td>
        {transaction.total.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
      <td>
        <span
          className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', {
            'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400': transaction.status === 'pending',
            'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400': transaction.status === 'completed',
            'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400': transaction.status === 'failed',
            'bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400': transaction.status === 'reversed',
          })}
        >
          {transaction.status}
        </span>
      </td>
      <td>
        {transaction.type === 'credit' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium dark:bg-green-800/20 dark:text-green-400">
            Credit
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-medium dark:bg-red-800/20 dark:text-red-400">
            Debit
          </span>
        )}
      </td>
      <td>{transaction.paymentMethod}</td>
      <td>{format(new Date(transaction.createdAt), 'MM/dd/yyyy HH:mm:ss')}</td>
      <td className="text-center">
        <ul className="flex items-center justify-center gap-2">
          {transaction.status === 'pending' && (
            <>
            <li>
              <Tippy content="Approve">
                <button type="button" onClick={() => handleTransactionAction(transaction.id, 'approve')}>
                  <PencilSquareIcon className="w-5 h-5 text-primary" />
                </button>
              </Tippy>
            </li>
            <li>
              <Tippy content="Decline">
                <button type="button" onClick={() => handleTransactionAction(transaction.id, 'decline')}>
                  <WrenchScrewdriverIcon className="w-5 h-5 text-primary" />
                </button>
              </Tippy>
            </li>
            </>
          )}
          <li>
            <Tippy content="Delete">
              <button type="button" onClick={() => handleTransactionAction(transaction.id, 'reverse')}>
                <XCircleIcon className="w-5 h-5 text-danger" />
              </button>
            </Tippy>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default TransactionRow;