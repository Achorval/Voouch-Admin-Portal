import { 
    PlusCircleIcon, 
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import {  
    ProductListQueryParams, 
} from '@/types/ProductTypes';
import TierLimitRow from './TierLimitRow';
import { Input } from '@/components/ui/Input';
import TierLimitModal from './TierLimitModal';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useProducts } from '@/hooks/useProducts';
import Pagination from '@/components/ui/Pagination';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TierLimits = () => {
    const { setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('Drag & Drop');
    });

    const navigate = useNavigate();
    const location = useLocation();
    const [queryParams, setQueryParams] = useState<ProductListQueryParams>({
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'displayOrder',
        sortOrder: 'asc',
    });

    // Extract productId from URL if editing
    const productId = location.pathname.match(/\/edit\/(.+)/)?.[1] || null;

    const { data: response, isLoading, error } = useProducts(queryParams);

    const handleSearch = (value: string) => {
        setQueryParams(prev => ({ ...prev, search: value, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setQueryParams(prev => ({ ...prev, page }));
    };

    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-5">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Settings
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Tier Limits</span>
                </li>
            </ul>
            <div className="panel">
                <div className="lg:flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-3 lg:mb-0">Tier Limit List</h5>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <Input
                            placeholder="Search..."
                            startIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
                            value={queryParams.search || ''}
                            onChange={(e: { target: { value: string; }; }) => handleSearch(e.target.value)}
                            className="max-w-xs"
                        />
                        <Button className="w-full" variant="primary" startIcon={<PlusCircleIcon className="w-4 h-4" />} onClick={() => navigate('/app/settings/tier-limits/new')}>
                            Add Tier Limit
                        </Button>
                    </div>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Daily Limit</th>
                                <th>Maximum Balance</th>
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
                                response.data.map((product) => (
                                    <TierLimitRow
                                        key={product.id}
                                        product={product}
                                        onEdit={() => navigate(`/app/settings/tier-limits/edit/${product.id}`)}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No products found
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
                <TierLimitModal productId={productId} />
            </div>
        </Fragment>
    );
};

export default TierLimits;