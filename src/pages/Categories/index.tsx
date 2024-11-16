import { Fragment, useEffect, useState } from 'react';
import { 
    Link, 
    useLocation, 
    useNavigate 
} from 'react-router-dom';
import type { 
    CategorySortBy, 
    CategoryListQueryParams, 
} from '@/types/CategoryTypes';
import CategoryRow from './CategoryRow';
import CategoryModal from './CategoryModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import Pagination from '@/components/ui/Pagination';
import { useCategories } from '@/hooks/useCategories';
import { MultiValue, SingleValue } from 'react-select';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Select, Option } from '@/components/ui/Select/Select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const sortOptions: Option[] = [
    { value: 'name', label: 'Name' },
    { value: 'code', label: 'Code' },
    { value: 'displayOrder', label: 'Display Order' },
    { value: 'createdAt', label: 'Created Date' },
];

const Categories = () => {    
    const navigate = useNavigate();
    const location = useLocation();
    const { setPageTitle } = useTheme();
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

    // Extract categoryId from URL if editing
    const categoryId = location.pathname.match(/\/edit\/(.+)/)?.[1] || null;

    const { data: response, isLoading, error } = useCategories(queryParams);

    const handleSearch = (value: string) => {
        setQueryParams(prev => ({ ...prev, search: value, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setQueryParams(prev => ({ ...prev, page }));
    };

    const handleSortChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (!newValue) return; // Handle case where no option is selected

        if (Array.isArray(newValue)) {
            // Handle multi-select case
            console.log("Multi-select values:", newValue);
        } else {
            // Handle single-select case
            if (newValue) {
                setQueryParams(prev => ({
                    ...prev,
                    sortBy: (newValue as Option).value as CategorySortBy
                }));
            }
        }
    };
    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/app/systems/categories" className="text-primary hover:underline">
                        Systems
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Categories</span>
                </li>
            </ul>
            <div className="panel mt-5">
                <div className="lg:flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-3 lg:mb-0">Category List</h5>
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
                        <Button className="w-full" variant="primary" startIcon={<PlusCircleIcon className="w-4 h-4" />} onClick={() => navigate('/app/systems/categories/new')}>
                            Add Category
                        </Button>
                    </div>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Status</th>
                                <th>Display Order</th>
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
                                    <CategoryRow 
                                        key={category.id} 
                                        category={category} 
                                        onEdit={() => navigate(`/app/systems/categories/edit/${category.id}`)} 
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No categories found
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
                <CategoryModal categoryId={categoryId} />
            </div>
        </Fragment>
    );
};

export default Categories;