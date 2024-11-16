// src/pages/home/products/index.tsx
import { 
    PlusCircleIcon, 
    MagnifyingGlassIcon, 
} from '@heroicons/react/24/outline';
import type { 
    ProductListQueryParams, 
    ProductSortBy 
} from '@/types/ProductTypes';
import ProductRow from './ProductRow';
import ProductModal from './ProductModal';
import { Fragment, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useProducts } from '@/hooks/useProducts';
import Pagination from '@/components/ui/Pagination';
import { SingleValue, MultiValue } from 'react-select';
import { Select, Option } from '@/components/ui/Select/Select';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sortOptions: Option[] = [
    { value: 'name', label: 'Name' },
    { value: 'code', label: 'Code' },
    { value: 'displayOrder', label: 'Display Order' },
    { value: 'createdAt', label: 'Created Date' },
];

const Products = () => {
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

    const handleSortChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
        if (!newValue || Array.isArray(newValue)) return;
        setQueryParams(prev => ({
            ...prev,
            sortBy: (newValue as Option).value as ProductSortBy
        }));
    };
    return (
        <Fragment>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/app/systems/products" className="text-primary hover:underline">
                        Systems
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Products</span>
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
                        <Button className="w-full" variant="primary" startIcon={<PlusCircleIcon className="w-4 h-4" />} onClick={() => navigate('/app/systems/products/new')}>
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
                                response.data.map((product) => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        onEdit={() => navigate(`/app/systems/products/edit/${product.id}`)}
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
                <ProductModal productId={productId} />
            </div>
        </Fragment>
    );
};

export default Products;