import { 
    PlusCircleIcon, 
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { 
    CategoryListQueryParams, 
} from '@/types/CategoryTypes';
import GeneralRow from './GeneralRow';
import GeneralModal from './GeneralModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import Pagination from '@/components/ui/Pagination';
import { useCategories } from '@/hooks/useCategories';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Generals = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('About');
    });

    const [queryParams, setQueryParams] = useState<CategoryListQueryParams>({
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'displayOrder',
        sortOrder: 'asc',
    });

    useEffect(() => {
        setPageTitle('Crypto');
    });

    // Extract generalId from URL if editing
    const generalId = location.pathname.match(/\/edit\/(.+)/)?.[1] || null;

    const { data: response, isLoading, error } = useCategories(queryParams);

    const handleSearch = (value: string) => {
        setQueryParams(prev => ({ ...prev, search: value, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setQueryParams(prev => ({ ...prev, page }));
    };

    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Settings
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Generals</span>
                </li>
            </ul>
            <div className="panel mt-5">
                <div className="lg:flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-3 lg:mb-0">General List</h5>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <Input
                            placeholder="Search..."
                            startIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
                            value={queryParams.search || ''}
                            onChange={(e: { target: { value: string; }; }) => handleSearch(e.target.value)}
                            className="max-w-xs"
                        />
                        <Button className="w-full" variant="primary" startIcon={<PlusCircleIcon className="w-4 h-4" />} onClick={() => navigate('/app/settings/generals/new')}>
                            Add General
                        </Button>
                    </div>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Key</th>
                                <th>Value</th>
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
                                response.data.map((category) => (
                                    <GeneralRow 
                                        key={category.id} 
                                        category={category} 
                                        onEdit={() => navigate(`/app/settings/generals/edit/${category.id}`)} 
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No generals found
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
                <GeneralModal categoryId={generalId} />
            </div>
        </Fragment>
    );
};

export default Generals;