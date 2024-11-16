import { 
    PlusIcon, 
    BanknotesIcon, 
    MagnifyingGlassIcon
} from '@heroicons/react/24/solid';
import { 
    Link, 
    useNavigate, 
} from 'react-router-dom';
import { 
    UserRole, 
    UserTier, 
    UserStatus, 
    UserListQueryParams, 
} from '@/types/UserTypes';
import UserRow from './UserRow';
import UserModal from './UserModal';
import { useUsers } from '@/hooks/useUsers';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import Pagination from '@/components/ui/Pagination';
import { useState, Fragment, useEffect } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { Option, Select } from '@/components/ui/Select/Select';

const statusOptions: Option[] = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'blocked', label: 'Blocked' },
];

export const roleOptions: Option[] = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
];

export const tierOptions: Option[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'silver', label: 'Silver' },
    { value: 'gold', label: 'Gold' },
];

const UserList = () => {
    const navigate = useNavigate();
    const { setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('Contacts');
    });

    const userId = location.pathname.match(/\/edit\/(.+)/)?.[1] || null;

    const [queryParams, setQueryParams] = useState<UserListQueryParams>({
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const { data: response, isLoading, error } = useUsers(queryParams);

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
                status: (newValue as Option).value as UserStatus,
                page: 1,
            }));
        }
    };

    const handleRoleChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (newValue) {
            setQueryParams((prev) => ({
                ...prev,
                role: (newValue as Option).value as UserRole,
                page: 1,
            }));
        }
    };

    const handleTierChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (newValue) {
            setQueryParams((prev) => ({
                ...prev,
                tierLevel: (newValue as Option).value as UserTier,
                page: 1,
            }));
        }
    };
    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>User List</span>
                </li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-info/10 text-info rounded-xl w-11 h-11 flex justify-center items-center dark:bg-info dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">Total Customers</h5>
                            <p className="text-xl dark:text-white-light">31.6K</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">Active Customers</h5>
                            <p className="text-xl dark:text-white-light">1,900</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg panel h-full p-0">
                    <div className="flex p-5">
                        <div className="shrink-0 bg-secondary/10 text-secondary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-secondary dark:text-white-light">
                            <BanknotesIcon className="w-5 h-5" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                            <h5 className="text-[#506690] text-xs">New Customers</h5>
                            <p className="text-xl dark:text-white-light">18.2%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel mt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">User List</h5>
                    <Button type="button" variant="primary" onClick={() => navigate('/app/users/user-list/new')}>
                        <PlusIcon className="ltr:mr-2 rtl:ml-2 w-5 h-5" />
                        Add User
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    <Input
                        placeholder="Search users..."
                        startIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
                        value={queryParams.search || ''}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Select value={statusOptions.find((opt) => opt.value === queryParams.status)} options={statusOptions} onChange={handleStatusChange} placeholder="Filter by status" />
                    <Select value={roleOptions.find((opt) => opt.value === queryParams.role)} options={roleOptions} onChange={handleRoleChange} placeholder="Filter by role" />
                    <Select value={tierOptions.find((opt) => opt.value === queryParams.tierLevel)} options={tierOptions} onChange={handleTierChange} placeholder="Filter by tier" />
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Contact</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>KYC Level</th>
                                <th>Created</th>
                                <th className="!text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-red-500">
                                        {error.message}
                                    </td>
                                </tr>
                            ) : response?.data.length ? (
                                response.data.map((user) => (
                                    <UserRow
                                        key={user.id}
                                        user={user}
                                        onEdit={() => navigate(`/app/users/user-list/edit/${user.id}`)}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={queryParams.page || 1} totalPages={response?.meta.pages || 1} onPageChange={handlePageChange} />
            </div>
            <UserModal
                userId={userId}
            />
        </Fragment>
    );
};

export default UserList;