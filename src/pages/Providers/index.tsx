import ProviderRow from './ProviderRow';
import ProviderModal from './ProviderModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useProviders } from '@/hooks/useProviders';
import Pagination from '@/components/ui/Pagination';
import { Fragment, useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import ProviderConfigModal from './ProviderConfigModal';
import { Select, Option } from '@/components/ui/Select/Select';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { ProviderListQueryParams, ProviderSortBy } from '@/types/ProviderTypes';

const sortOptions: Option[] = [
    { value: 'name', label: 'Name' },
    { value: 'code', label: 'Code' },
    { value: 'createdAt', label: 'Created Date' },
];

const Providers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setPageTitle } = useTheme();
    const [queryParams, setQueryParams] = useState<ProviderListQueryParams>({
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    useEffect(() => {
        setPageTitle('Charts');
    });
    
    const providerId = location.pathname.match(/\/edit\/(.+)/)?.[1] || null;

    const { data: response, isLoading, error } = useProviders(queryParams);

    const handleSearch = (value: string) => {
        setQueryParams(prev => ({ ...prev, search: value, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setQueryParams(prev => ({ ...prev, page }));
    };

    const handleSortChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (!newValue) return;

        if (Array.isArray(newValue)) {
        console.log("Multi-select values:", newValue);
        } else {
        setQueryParams(prev => ({
            ...prev,
            sortBy: (newValue as Option).value as ProviderSortBy
        }));
        }
    };

    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Systems
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Providers</span>
                </li>
            </ul>
            <div className="panel mt-5">
                <div className="lg:flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-3 lg:mb-0">Product List</h5>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <Input
                            placeholder="Search..."
                            startIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
                            value={queryParams.search || ''}
                            onChange={(e: { target: { value: string; }; }) => handleSearch(e.target.value)}
                            className="max-w-xs"
                        />
                        <Select
                            value={sortOptions.find(opt => opt.value === queryParams.sortBy)}
                            options={sortOptions}
                            isMulti={false}
                            onChange={handleSortChange}
                            placeholder="Sort by..."
                        />
                        <Button className="w-full" variant="primary" startIcon={<PlusCircleIcon className="w-4 h-4" />} onClick={() => navigate('/app/systems/providers/new')}>
                            Add Product
                        </Button>
                    </div>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Base URL</th>
                                <th>Live Mode</th>
                                <th className="!text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-red-500">
                                        {error.message}
                                    </td>
                                </tr>
                            ) : response?.data?.length ? (
                                response.data.map((provider) => (
                                    <ProviderRow
                                        key={provider.id}
                                        provider={provider}
                                        onEdit={() => navigate(`/app/systems/providers/edit/${provider.id}`)}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No providers found
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

                <ProviderModal providerId={providerId} />

                <ProviderConfigModal />
            </div>
        </Fragment>
    );
};

export default Providers;