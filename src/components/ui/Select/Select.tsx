// src/components/ui/Select.tsx
import React from 'react';
import ReactSelect, { 
    Props as SelectProps,
    StylesConfig,
    GroupBase,
    ClearIndicatorProps,
    DropdownIndicatorProps,
    components,
} from 'react-select';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export type Option = {
    label: string;
    value: string | number;
    [key: string]: any;
};

interface CustomSelectProps extends Omit<SelectProps<Option, boolean, GroupBase<Option>>, 'theme'> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const CustomSelect = React.forwardRef<any, CustomSelectProps>(
    ({ label, error, className, fullWidth = true, ...props }, ref) => {
        const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
            control: (provided, state) => ({
                ...provided,
                backgroundColor: 'white',
                borderColor: error ? '#e7515a' : state.isFocused ? '#4361ee' : '#e0e6ed',
                boxShadow: 'none',
                '&:hover': {
                    borderColor: error ? '#e7515a' : '#4361ee',
                },
                minHeight: '42px',
                width: fullWidth ? '100%' : 'auto',
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: 'white',
                border: '1px solid #e0e6ed',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected 
                    ? '#4361ee' 
                    : state.isFocused 
                    ? '#eaf1ff'
                    : 'transparent',
                color: state.isSelected ? 'white' : 'black',
                cursor: 'pointer',
                '&:active': {
                    backgroundColor: '#4361ee',
                    color: 'white',
                },
            }),
            input: (provided) => ({
                ...provided,
                color: 'black',
            }),
            singleValue: (provided) => ({
                ...provided,
                color: 'black',
            }),
            indicatorSeparator: () => ({
                display: 'none',
            }),
        };

        const ClearIndicator = (props: ClearIndicatorProps<Option>) => {
            return (
                <components.ClearIndicator {...props}>
                    <XMarkIcon className="h-2 w-2" />
                </components.ClearIndicator>
            );
        };

        const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
            return (
                <components.DropdownIndicator {...props}>
                    <ChevronDownIcon className="h-2 w-2 size1-6" />
                </components.DropdownIndicator>
            );
        };

        return (
            <div className={`${fullWidth ? 'w-full' : 'w-auto'}`}>
                {label && (
                    <label className="mb-1.5 block font-semibold">
                        {label}
                    </label>
                )}
                <ReactSelect
                    ref={ref}
                    styles={customStyles}
                    components={{ 
                        ClearIndicator,
                        DropdownIndicator,
                    }}
                    className={className}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-danger">{error}</p>
                )}
            </div>
        );
    }
);

CustomSelect.displayName = 'Select';

export { CustomSelect as Select };