import { 
    TransactionType, 
    TransactionStatus, 
    TransactionActionType, 
    TransactionListQueryParams, 
} from '@/types/TransactionTypes';
import { 
    useTransactions, 
    useTransactionAction, 
} from '@/hooks/useTransactions';
import { Input } from '@/components/ui/Input';
import TransactionRow from './TransactionRow';
import { useTheme } from '@/context/ThemeContext';
import { toast } from '@/components/ui/SweetAlert';
import Pagination from '@/components/ui/Pagination';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { Option } from '@/components/ui/Select/Select';
import { Select } from '@/components/ui/Select/Select2';

const TransactionList = () => {
    const navigate = useNavigate();
    const { setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('Font Icons');
    });

    const [queryParams, setQueryParams] = useState<TransactionListQueryParams>({
        page: 1,
        limit: 10,
        status: undefined,
        type: undefined,
        startDate: undefined,
        endDate: undefined,
        minAmount: undefined,
        maxAmount: undefined,
        paymentMethod: undefined,
        categoryId: undefined,
        reference: undefined,
        search: undefined,
        userId: undefined,
    });

    const { data: transactions, isLoading, error } = useTransactions(queryParams);
    const { mutate: performTransactionAction } = useTransactionAction();

    const handleSearch = (value: string) => {
        setQueryParams((prev) => ({ ...prev, search: value, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setQueryParams((prev) => ({ ...prev, page }));
    };

    const handleStatusChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (newValue) {
            setQueryParams((prev) => ({
                ...prev,
                status: (newValue as SingleValue<Option>)?.value as TransactionStatus,
                page: 1,
            }));
        }
    };

    const handleTypeChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (newValue) {
            setQueryParams((prev) => ({
                ...prev,
                type: (newValue as SingleValue<Option>)?.value as TransactionType,
                page: 1,
            }));
        }
    };

    const handleTransactionAction = (id: string, action: TransactionActionType) => {
        performTransactionAction(
            { id, action, reason: 'reason' },
            {
                onSuccess: () => {
                    toast('Transaction action successful', { icon: 'success' });
                },
                onError: (error) => {
                    toast((error as Error).message, { icon: 'error' });
                },
            }
        );
    };
    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Transactions
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List</span>
                </li>
            </ul>
            <div className="panel mt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="text-lg font-semibold dark:text-white-light">Transaction List</h5>
                    <button
                        type="button"
                        className="inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent border dark:backdrop-blur hover:text-primary hover:border-primary h-[34px] pe-3 ps-2.5"
                        // onClick={() => navigate('/app/support-tickets/list/filters')}
                    >
                        <PlusIcon className="ltr:mr-2 rtl:ml-2 w-5 h-5" />
                        Filters
                    </button>
                </div>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Search" placeholder="Search transactions..." value={queryParams.search || ''} onChange={(e) => handleSearch(e.target.value)} />
                    <Select
                        label="Status"
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'processing', label: 'Processing' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'failed', label: 'Failed' },
                            { value: 'reversed', label: 'Reversed' },
                        ]}
                        isMulti
                        onChange={handleStatusChange}
                        placeholder="Filter by status"
                    />
                    <Select
                        label="Type"
                        options={[
                            { value: 'credit', label: 'Credit' },
                            { value: 'debit', label: 'Debit' },
                        ]}
                        isMulti
                        onChange={handleTypeChange}
                        placeholder="Filter by type"
                    />
                </div>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                        type="date"
                        label="Start Date"
                        value={queryParams.startDate?.toISOString().slice(0, 10) || ''}
                        onChange={(e) => setQueryParams((prev) => ({ ...prev, startDate: e.target.value ? new Date(e.target.value) : undefined, page: 1 }))}
                    />
                    <Input
                        type="date"
                        label="End Date"
                        value={queryParams.endDate?.toISOString().slice(0, 10) || ''}
                        onChange={(e) => setQueryParams((prev) => ({ ...prev, endDate: e.target.value ? new Date(e.target.value) : undefined, page: 1 }))}
                    />
                    <Input
                        label="Minimum Amount"
                        type="number"
                        value={queryParams.minAmount || ''}
                        onChange={(e) => setQueryParams((prev) => ({ ...prev, minAmount: e.target.value ? parseFloat(e.target.value) : undefined, page: 1 }))}
                    />
                    <Input
                        label="Maximum Amount"
                        type="number"
                        value={queryParams.maxAmount || ''}
                        onChange={(e) => setQueryParams((prev) => ({ ...prev, maxAmount: e.target.value ? parseFloat(e.target.value) : undefined, page: 1 }))}
                    />
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th className="!text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={11} className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={11} className="text-center py-4 text-red-500">
                                        {error.message}
                                    </td>
                                </tr>
                            ) : transactions?.data.length ? (
                                transactions.data.map((transaction) => (
                                    <TransactionRow key={transaction.id} transaction={transaction} handleTransactionAction={handleTransactionAction} onEdit={() => navigate(`/app/histories/transaction-list/${transaction.id}`)} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="text-center py-4 text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={queryParams.page || 1} totalPages={transactions?.meta.pages || 1} onPageChange={handlePageChange} />
            </div>
        </Fragment>
    );
};

export default TransactionList;