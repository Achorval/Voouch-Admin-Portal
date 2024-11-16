// src/pages/SupportTickets/FilterModal.tsx
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MultiValue, SingleValue } from 'react-select';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { Option, Select } from '@/components/ui/Select/Select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SupportTicketListQueryParams } from '@/types/SupportTicketTypes';

interface FilterModalProps {
    queryParams: SupportTicketListQueryParams;
    handleStatusChange: (newValue: SingleValue<Option> | MultiValue<Option>) => void;
    handlePriorityChange: (newValue: SingleValue<Option> | MultiValue<Option>) => void;
};

const statusOptions: Option[] = [
    { value: 'open', label: 'Open' },
    { value: 'pending', label: 'Pending' }, 
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
];

const priorityOptions: Option[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }  
];

const FilterModal = ({ queryParams, handleStatusChange, handlePriorityChange }: FilterModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    // const { isLoading: isLoadingCategory } = useCategory(categoryId || null, {
    //     enabled: !!categoryId
    // });

    const onClose = () => {
        navigate('/app/support-tickets/list');
    };

    const isOpen = location.pathname.includes('/filters');

    // if (isLoadingCategory) {
    //     return null;
    // }

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="right" className="flex flex-col !m-0">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                <h2 className="text-xl font-semibold">Table Filters</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <form className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-4 space-y-6">
                        <Input
                            placeholder="Search tickets..."
                            startIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
                        />
                        <Select
                            value={statusOptions.find(opt => opt.value === queryParams.status)}  
                            options={statusOptions}
                            onChange={handleStatusChange}
                            placeholder="Filter by status"
                            isClearable
                        />
                        <Select
                            value={priorityOptions.find(opt => opt.value === queryParams.priority)}
                            options={priorityOptions}  
                            onChange={handlePriorityChange}
                            placeholder="Filter by priority"
                            isClearable
                        />
                    </div>
                </div>
                {/* Fixed Footer */}
                <div className="mt-auto px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                    <div className="flex justify-center gap-3">
                        <Button
                            type="button"
                            variant="outline-danger"
                            onClick={onClose}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default FilterModal;