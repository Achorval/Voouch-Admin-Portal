import { 
    SupportTicketStatus, 
    SupportTicketPriority, 
    SupportTicketListQueryParams, 
} from '@/types/SupportTicketTypes';
import TicketRow from './TicketRow';
import FilterModal from './FilterModal';
import { useTheme } from '@/context/ThemeContext';
import Pagination from '@/components/ui/Pagination';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { Option } from '@/components/ui/Select/Select';
import { useSupportTickets } from '@/hooks/useSupportTickets';

const SupportTicketList = () => {
    const navigate = useNavigate();

    const { setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('Drag & Drop');
    });

    const [queryParams, setQueryParams] = useState<SupportTicketListQueryParams>({
        page: 1,
        limit: 10,
        status: undefined,
        priority: undefined,
    });

    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: response, isLoading, error } = useSupportTickets(queryParams);

    const handlePageChange = (page: number) => {
        setQueryParams((prev) => ({ ...prev, page }));
    };

    const handleStatusChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (newValue) {
            setQueryParams((prev) => ({
                ...prev,
                status: (newValue as Option).value as SupportTicketStatus,
                page: 1,
            }));
        } else {
            setQueryParams((prev) => ({
                ...prev,
                status: undefined,
                page: 1,
            }));
        }
    };

    const handlePriorityChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (newValue) {
            setQueryParams((prev) => ({
                ...prev,
                priority: (newValue as Option).value as SupportTicketPriority,
                page: 1,
            }));
        } else {
            setQueryParams((prev) => ({
                ...prev,
                priority: undefined,
                page: 1,
            }));
        }
    };

    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Support Tickets
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Ticket List</span>
                </li>
            </ul>
            <div className="panel mt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Ticket List</h5>
                    <button
                        type="button"
                        className="inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent border dark:backdrop-blur hover:text-primary hover:border-primary h-[34px] pe-3 ps-2.5"
                        onClick={() => navigate('/app/support-tickets/list/filters')}
                    >
                        <PlusIcon className="ltr:mr-2 rtl:ml-2 w-5 h-5" />
                        Filters
                    </button>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Category</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assigned To</th>
                                <th>Created</th>
                                <th className="!text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-red-500">
                                        {error.message}
                                    </td>
                                </tr>
                            ) : response?.data?.length ? (
                                response.data.map((ticket) => (
                                    <TicketRow
                                        key={ticket.id}
                                        ticket={ticket}
                                        onEdit={() => {
                                            setSelectedTicket(ticket.id);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-gray-500">
                                        No tickets found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={queryParams.page || 1}
                    totalPages={response?.meta.pages || 1}
                    onPageChange={handlePageChange}
                />
            </div>
            <FilterModal 
                queryParams={queryParams}
                handleStatusChange={handleStatusChange}
                handlePriorityChange={handlePriorityChange}
            />
        </Fragment>
    );
};

export default SupportTicketList;
