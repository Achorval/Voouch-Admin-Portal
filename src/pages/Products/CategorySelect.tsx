// src/pages/home/products/CategorySelect.tsx
import React from 'react';
import { useController } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Select, Option } from '@/components/ui/Select/Select';
import { categoryService } from '@/services/CategoryService';

interface CategorySelectProps {
    name: string;
    control: any;
    error?: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
    name,
    control,
    error
}) => {
    // Fetch categories
    const { data: response, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.listCategories({ 
            isEnabled: true,
            limit: 100 // Fetch all enabled categories
        })
    });

    const {
        field: { onChange, value }
    } = useController({
        name,
        control
    });

    const categories = response?.data || [];
    const options: Option[] = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <div className="space-y-2">
            <Select
                options={options}
                value={options.find(opt => opt.value === value)}
                onChange={(newValue) => {
                    if (!newValue || Array.isArray(newValue)) return;
                    onChange(newValue);
                }}
                isLoading={isLoading}
                placeholder="Select category"
                noOptionsMessage={() => "No categories found"}
                isDisabled={isLoading}
                className={error ? 'border-danger' : ''}
            />
            {error && (
                <p className="text-sm text-danger">
                    {error}
                </p>
            )}
        </div>
    );
};

export default CategorySelect;